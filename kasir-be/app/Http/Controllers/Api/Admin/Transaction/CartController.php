<?php

namespace App\Http\Controllers\Api\Admin\Transaction;

use App\Http\Controllers\Controller;
use App\Http\Resources\CartResource;
use App\Models\Transaction\Cart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use DB;

class CartController extends Controller
{
    public function index()
    {
        $carts = Cart::with('product')->where('user_id',Auth::user()->id)->get();

        //return with api resource
        return new CartResource(true, 'List Data Carts', $carts);
    }
    public function store(Request $request)
    {
        
       
        $validator = Validator::make($request->all(), [
            'qty'          => 'required',
            
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $check_cart = Cart::where('product_id', $request->product_id)->first() ?? null;
        if($check_cart != null){
            $cart = Cart::where('product_id', $request->product_id)->update(['qty' => $request->qty + $check_cart->qty]);
        }else{
            //create cart
            $cart = Cart::create([
                'qty'          => $request->qty,
                'product_id'    => $request->product_id,
                'price'         => $request->sell_price,
                'user_id'       => Auth::user()->id,
                'created_by'    => Auth::user()->id,
                'shop_id'       => Auth::user()->shop_id,
            ]);

        }
        
    

        if($cart) {
            //return success with Api Resource
            return new CartResource(true, 'Data Cart Berhasil di Tambahkan!', $cart);
        }

        //return failed with Api Resource
        return new CartResource(false, 'Data Cart Gagal di Tambahkan!', null);
    }

    public function cart_sum(Request $request){
        $cart_sum= Cart::where('user_id', Auth::user()->id)->sum(DB::raw('price * qty'));
        if($cart_sum) {
            //return success with Api Resource
            return new CartResource(true, 'Data Cart Berhasil di Tambahkan!', $cart_sum);
        }

        //return failed with Api Resource
        return new CartResource(false, 'Data Cart Gagal di Tambahkan!', null);
    }
    public function destroy(string $id)
    {
        $cart = Cart::whereId($id)->first();
        $cart->delete();
         //return failed with Api Resource
         return new CartResource(false, 'Data Cart Brhasil di Hapus!', null);
    }
}
