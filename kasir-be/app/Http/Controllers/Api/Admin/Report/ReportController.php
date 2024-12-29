<?php

namespace App\Http\Controllers\api\admin\Report;

use App\Http\Controllers\Controller;
use App\Http\Resources\ReportResource;
use Illuminate\Http\Request;
use App\Models\Transaction\Expense;
use App\Models\Transaction\Transaction;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use DB;

class ReportController extends Controller
{
    
    public function index()
    {
        $auth = Auth::user()->type_user;
        $shop_id = Auth::user()->shop_id;
        $branch_id = Auth::user()->branch_id;
        if($auth == 1){
            $transactions = Expense::with('category')->whereBetween('expense_date',[request()->start_date, request()->end_date])->selectRaw('*, ROW_NUMBER() OVER (ORDER BY id) as no')->paginate(5);

            //append query string to pagination
            $transactions->appends(['date_expense' => request()->date_expense]);
        }else if($auth == 2){
            $transactions = Expense::where('shop_id',$shop_id)->with('category')->whereBetween('expense_date',[request()->start_date, request()->end_date])->selectRaw('*, ROW_NUMBER() OVER (ORDER BY id) as no')->paginate(5);

            //append query string to pagination
            $transactions->appends(['date_expense' => request()->date_expense]);
        }else{
            $transactions = Expense::where('shop_id',$shop_id)->where('branch_id',$branch_id)->with('category')->whereBetween('expense_date',[request()->start_date, request()->end_date])->selectRaw('*, ROW_NUMBER() OVER (ORDER BY id) as no')->paginate(5);

            //append query string to pagination
            $transactions->appends(['date_expense' => request()->date_expense]);
        }
    
        //return with api resource
        return new ReportResource(true, 'List Data Branch', $transactions);
    }
    public function indexOrder()
    {
        $auth = Auth::user()->type_user;
        $shop_id = Auth::user()->shop_id;
        $branch_id = Auth::user()->branch_id;
        if($auth == 1){
            $transactions = Transaction::with('customer','user')->whereBetween('created_at',[request()->start_date, request()->end_date])->selectRaw('*, ROW_NUMBER() OVER (ORDER BY id) as no')->paginate(5);

            //append query string to pagination
            $transactions->appends(['date_expense' => request()->date_expense]);
        }else if($auth == 2){
            $transactions = Transaction::where('shop_id',$shop_id)->with('customer','user')->whereBetween('created_at',[request()->start_date, request()->end_date])->selectRaw('*, ROW_NUMBER() OVER (ORDER BY id) as no')->paginate(5);

            //append query string to pagination
            $transactions->appends(['date_expense' => request()->date_expense]);
        }else{
            $transactions = Transaction::where('shop_id',$shop_id)->where('branch_id',$branch_id)->with('customer','user')->whereBetween('created_at',[request()->start_date, request()->end_date])->selectRaw('*, ROW_NUMBER() OVER (ORDER BY id) as no')->paginate(5);

            //append query string to pagination
            $transactions->appends(['date_expense' => request()->date_expense]);
        }
 
        //return with api resource
        return new ReportResource(true, 'List Data Branch', $transactions);
    }
}
