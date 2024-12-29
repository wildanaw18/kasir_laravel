<?php

namespace App\Http\Controllers\Api\Admin\Transaction;

use App\Http\Controllers\Controller;
use App\Http\Resources\TransactionResource;
use App\Models\Master\Shop;
use App\Models\Product\Product;
use App\Models\Transaction\Cart;
use App\Models\Transaction\Transaction;
use App\Models\Transaction\TransactionDetail;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use DB;

class TransactionController extends Controller
{
    public function index(){
        $auth = Auth::user()->type_user;
        $shop_id = Auth::user()->shop_id;
        $branch_id = Auth::user()->branch_id;
        
        if($auth == 1){
            $transactions = Transaction::when(request()->search, function($transactions){
                $transactions = $transactions->where('invoice', 'like', '%'. request()->search . '%');
            })->selectRaw('*, ROW_NUMBER() OVER (ORDER BY id) as no')->paginate(5);
        }else if($auth == 2){
            $transactions = Transaction::when(request()->search, function($transactions){
                $transactions = $transactions->where('invoice', 'like', '%'. request()->search . '%');
            })->where('shop_id',$shop_id)->selectRaw('*, ROW_NUMBER() OVER (ORDER BY id) as no')->paginate(5);
        }else{
            $transactions = Transaction::when(request()->search, function($transactions){
                $transactions = $transactions->where('invoice', 'like', '%'. request()->search . '%');
            })->where('shop_id',$shop_id)->where('branch_id',$branch_id)->selectRaw('*, ROW_NUMBER() OVER (ORDER BY id) as no')->paginate(5);
        }
        //append query string to pagination
        $transactions->appends(['search' => request()->search]);
    //return with api resource
    return new TransactionResource(true, 'List Data transaction', $transactions);
    
    }

    public function reportDay(){
        $auth = Auth::user()->type_user;
        $shop_id = Auth::user()->shop_id;
        $branch_id = Auth::user()->branch_id;
        
        if($auth == 1){
            $transactions = Transaction::when(request()->search, function($transactions){
                $transactions = $transactions->where('invoice', 'like', '%'. request()->search . '%');
            })->selectRaw('*, ROW_NUMBER() OVER (ORDER BY id) as no')->paginate(5);
        }else{
            $transactions = Transaction::when(request()->search, function($transactions){
                $transactions = $transactions->where('invoice', 'like', '%'. request()->search . '%');
            })->where('shop_id',$shop_id)->where('branch_id',$branch_id)->selectRaw('*, ROW_NUMBER() OVER (ORDER BY id) as no')->paginate(5);
        }
        //append query string to pagination
        $transactions->appends(['search' => request()->search]);
    //return with api resource
    return new TransactionResource(true, 'List Data transaction', $transactions);
    
    }

    public function store(Request $request)
    {
   
        /**
        * algorithm generate no invoice
        */
        // $length = 10;
        // $random = '';
        // for ($i = 0; $i < $length; $i++) {
        //     $random .= rand(0, 1) ? rand(0, 9) : chr(rand(ord('a'), ord('z')));
        // }

        // //generate no invoice
        // $invoice = 'INV-'.Str::upper($random);
        $shop = User::with('shop')->where('id', Auth::user()->id)->first();
        $tlc = $shop->shop->header_inv.'TRX';
        $max = DB::select("SELECT MAX(RIGHT(invoice,4)) AS invoice FROM transactions WHERE invoice LIKE '%$tlc%'");
        $no="0";
        foreach ($max as $a){
            $no=$a->invoice;
        }
        // dd($max);
        $invoice = "0001";
        if($no>0){
            $invoice = $no+1;
            $invoice = sprintf("%04s", $invoice);
        }
        $invoices = "$tlc$invoice";

        //insert transaction
        $transaction = Transaction::create([
            'user_id'       => auth()->user()->id,
            'created_by'    => auth()->user()->id,
            'shop_id'       => auth()->user()->shop_id,
            'customer_id'   => $request->customer_id,
            'invoice'       => $invoices,
            'cash'          => $request->cash,
            'change'        => $request->change,
            'discount'      => $request->disc,
            'sub_total'     => $request->sum_price,
            'grand_total'   => $request->sum_all,
            'branch_id'     => auth()->user()->branch_id,
            
        ]);

        //get carts
        $carts = Cart::where('user_id', auth()->user()->id)->get();

        //insert transaction detail
        foreach($carts as $cart) {

            //insert transaction detail
            TransactionDetail::create([
                'transaction_id'    => $transaction->id,
                'product_id'        => $cart->product_id,
                'qty'               => $cart->qty,
                'invoice'           => $invoices,
                'price'             => $cart->price,
                'created_by'        => auth()->user()->id,
                'shop_id'           => auth()->user()->shop_id,
                'branch_id'     => auth()->user()->branch_id
            ]);

           
            //update stock product
            $product = Product::find($cart->product_id);
            $product->stock = $product->stock - $cart->qty;
            $product->save();

        }

        //delete carts
        Cart::where('user_id', auth()->user()->id)->delete();

        return response()->json([
            'success' => true,
            'data'    => $transaction
        ]);
    }

    public function print(Request $request, $id)
    {   
        //get shops 
        $shops = Shop::first();
        //get transaction
        $transaction = Transaction::with('user','shop','customer')->where('invoice',$id)->first();
        

        //return view
        return response()->json([
            'success' => true,
            'data'    => $transaction
        ]);
    }
    public function printDetail($id)
    {   
        //get shops 
        $shops = Shop::first();
        //get transaction
        $transaction = TransactionDetail::with('product')->where('invoice',$id)->get();
        

        //return view
        return response()->json([
            'success' => true,
            'data'    => $transaction
        ]);
    }
}
