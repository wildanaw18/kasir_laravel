<?php

namespace App\Http\Controllers\Api\Admin\Transaction;

use App\Http\Controllers\Controller;
use App\Http\Resources\ExpenseResource;
use App\Models\Master\Shop;
use App\Models\Transaction\Expense;
use App\Models\Transaction\Transaction;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use DB;

class ExpenseController extends Controller
{
    public function index()
    {
        $auth = Auth::user()->type_user;
        $shop_id = Auth::user()->shop_id;
        $branch_id = Auth::user()->branch_id;
        
        if($auth == 1){
            $transactions = Expense::when(request()->search, function($transactions){
                $transactions = $transactions->where('desc', 'like', '%'. request()->search . '%');
            })->with('category')->selectRaw('*, ROW_NUMBER() OVER (ORDER BY id) as no')->paginate(5);
        }else if($auth == 2){
            $transactions = Expense::when(request()->search, function($transactions){
                $transactions = $transactions->where('desc', 'like', '%'. request()->search . '%');
            })->where('shop_id',$shop_id)->with('category')->selectRaw('*, ROW_NUMBER() OVER (ORDER BY id) as no')->paginate(5);
        }else{
            $transactions = Expense::when(request()->search, function($transactions){
                $transactions = $transactions->where('desc', 'like', '%'. request()->search . '%');
            })->where('shop_id',$shop_id)->where('branch_id',$branch_id)->with('category')->selectRaw('*, ROW_NUMBER() OVER (ORDER BY id) as no')->paginate(5);
        }
        //append query string to pagination
        $transactions->appends(['search' => request()->search]);
 
        //return with api resource
        return new ExpenseResource(true, 'List Data Branch', $transactions);
    }

    public function store(Request $request)
    {
   
        $validator = Validator::make($request->all(), [
            'desc'          => 'required',
            
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        
        $shop = User::with('shop')->where('id', Auth::user()->id)->first();
        $tlc = $shop->shop->header_inv.'EX';
        $max = DB::select("SELECT MAX(RIGHT(expense_id,4)) AS expense_id FROM expenses WHERE expense_id LIKE '%$tlc%'");
        $no="0";
        foreach ($max as $a){
            $no=$a->expense_id;
        }
        // dd($max);
        $expense_id = "0001";
        if($no>0){
            $expense_id = $no+1;
            $expense_id = sprintf("%04s", $expense_id);
        }
        $expense_ids = "$tlc$expense_id";
        
        //create Branch
        $expense = Expense::create([
            'desc'              => $request->desc,
            'expense_id'        => $expense_ids,
            'category_id'       => $request->category_id,
            'amount'            => $request->amount,
            'expense_date'      => $request->expense_date,
            'user_id'           => Auth::user()->id,
            'shop_id'           => Auth::user()->shop_id,
            'branch_id'         => Auth::user()->branch_id,
        ]);

    

        if($expense) {
            //return success with Api Resource
            return new ExpenseResource(true, 'Data status Berhasil Disimpan!', $expense);
        }

        //return failed with Api Resource
        return new ExpenseResource(false, 'Data status Gagal Disimpan!', null);
    }

    public function show($id)
    {
        $expense = Expense::with('category')->whereId($id)->first();
        
        if($expense) {
            //return success with Api Resource
            return new ExpenseResource(true, 'Detail Data status!', $expense);
        }

        //return failed with Api Resource
        return new ExpenseResource(false, 'Detail Data Branch Tidak DItemukan!', null);
    }

    public function update(Request $request, Expense $expense)
    {
        $validator = Validator::make($request->all(), [
            'desc'          => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

       
        //update status without password
        $expense->update([
            'desc'              => $request->desc,
            // 'province_id'   => $request->province_id,
            'category_id'       => $request->category_id,
            'amount'            => $request->amount,
            'expense_date'      => $request->expense_date,
            'user_id'           => Auth::user()->id,
            'shop_id'           => Auth::user()->id,
           
        ]);



        if($expense) {
            //return success with Api Resource
            return new ExpenseResource(true, 'Data Branch Berhasil Diupdate!', $expense);
        }

        //return failed with Api Resource
        return new ExpenseResource(false, 'Data Branch Gagal Diupdate!', null);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
