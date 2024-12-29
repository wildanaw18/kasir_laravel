<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Resources\DashboardResource;
use App\Models\Booking;
use App\Models\Customer;
use App\Models\GenerateInvoice;
use App\Models\Post;

use App\Models\Aparatur;
use App\Models\Category;
use App\Models\Product\Product;
use App\Models\Transaction\Expense;
use App\Models\Transaction\Transaction;
use App\Models\Transaction\TransactionDetail;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Carbon\Carbon;
use DB;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $currentDate = Carbon::now()->toDateString(); // Get the current date
        
        $auth = Auth::user()->type_user;
        $shop_id = Auth::user()->shop_id;
        $branch_id = Auth::user()->branch_id;
        if($auth == 1){
            $dashboard_all = DB::select("SELECT
            COALESCE((SELECT SUM(grand_total) FROM transactions WHERE DATE(created_at) = '{$currentDate}'), 0) as sell_amount,
            COALESCE((SELECT SUM(grand_total) FROM transactions), 0) as grand_total,
            COALESCE((SELECT SUM(amount) FROM expenses), 0) as expense,
            COALESCE((COALESCE((SELECT SUM(grand_total) FROM transactions), 0) - COALESCE((SELECT SUM(amount) FROM expenses), 0)), 0) as income
            FROM transactions");
        }else if($auth == 2){
            $dashboard_all = DB::select("SELECT
            COALESCE((SELECT SUM(grand_total) FROM transactions WHERE shop_id = '$shop_id'  AND DATE(created_at) = '{$currentDate}'), 0) as sell_amount,
            COALESCE((SELECT SUM(grand_total) FROM transactions), 0 WHERE shop_id = '$shop_id' ) as grand_total,
            COALESCE((SELECT SUM(amount) FROM expenses), 0 WHERE shop_id = '$shop_id' ) as expense,
            COALESCE((COALESCE((SELECT SUM(grand_total) FROM transactions WHERE shop_id = '$shop_id' ), 0) - COALESCE((SELECT SUM(amount) FROM expenses), 0)), 0 WHERE shop_id = '$shop_id'  ) as income
            FROM transactions WHERE shop_id = '$shop_id' ");
        }else{
            $dashboard_all = DB::select("SELECT
            COALESCE((SELECT SUM(grand_total) FROM transactions WHERE shop_id = '$shop_id' AND branch_id = '$branch_id' AND DATE(created_at) = '{$currentDate}'), 0) as sell_amount,
            COALESCE((SELECT SUM(grand_total) FROM transactions), 0 WHERE shop_id = '$shop_id' AND branch_id = '$branch_id') as grand_total,
            COALESCE((SELECT SUM(amount) FROM expenses), 0 WHERE shop_id = '$shop_id' AND branch_id = '$branch_id') as expense,
            COALESCE((COALESCE((SELECT SUM(grand_total) FROM transactions WHERE shop_id = '$shop_id' AND branch_id = '$branch_id'), 0) - COALESCE((SELECT SUM(amount) FROM expenses), 0)), 0 WHERE shop_id = '$shop_id' AND branch_id = '$branch_id' ) as income
            FROM transactions WHERE shop_id = '$shop_id' AND branch_id = '$branch_id'");
        }

        //return response json
        //append query string to pagination links
        

        //return with Api Resource
        return new DashboardResource(true, 'List Data Dashboard', $dashboard_all);
    }
    public function indexStockMinus()
    {
        $auth = Auth::user()->type_user;
        $shop_id = Auth::user()->shop_id;
        $branch_id = Auth::user()->branch_id;
        if($auth == 1){
            $products = Product::where('stock',0)->get();
        }else if($auth == 2){
            $products = Product::where('stock',0)->where('shop_id',$shop_id)->get();
        }else{
            $products = Product::where('stock',0)->where('shop_id',$shop_id)->where('branch_id',$branch_id)->get();
        }
 
        //return with api resource
        return new DashboardResource(true, 'List Data Product', $products);
    }
    public function bestSeller()
    {
        $auth = Auth::user()->type_user;
        $shop_id = Auth::user()->shop_id;
        $branch_id = Auth::user()->branch_id;
        if ($auth == 1) {
            $products = TransactionDetail::with(['product' => function ($query) {
                $query->select('id', 'title'); // Select the columns you need from the 'products' table
                        }])
                        ->groupBy('product_id')
                        ->select('product_id', DB::raw('count(*) as total'))
                        ->orderByDesc('total')
                        ->limit(5)
                        ->get();
        
        } else if ($auth == 2) {
            $products = TransactionDetail::with(['product' => function ($query) {
                $query->select('id', 'title'); // Select the columns you need from the 'products' table
            }])
            ->groupBy('product_id')
            ->select('product_id', DB::raw('count(*) as total'))
            ->where('shop_id', $shop_id)
            ->orderByDesc('total')
            ->limit(5)
            ->get();
        
        } else {
            $products = TransactionDetail::with(['product' => function ($query) {
                $query->select('id', 'title'); // Select the columns you need from the 'products' table
            }])
            ->groupBy('product_id')
            ->select('product_id', DB::raw('count(*) as total'))
            ->where('shop_id', $shop_id)
            ->where('branch_id', $branch_id)
            ->orderByDesc('total')
            ->limit(5)
            ->get();
  
        }
 
        //return with api resource
        return new DashboardResource(true, 'List Data Product', $products);
    }

    public function barChart()
    {
        $auth = Auth::user()->type_user;
        $shop_id = Auth::user()->shop_id;
        $branch_id = Auth::user()->branch_id;
        $chart_sales_year = DB::table('transactions')
        ->selectRaw('MONTHNAME(created_at) as month, 
                    SUM(CASE WHEN shop_id = \'' . $shop_id . '\' THEN grand_total ELSE 0 END) as sales_total')
        ->groupByRaw('MONTH(created_at), MONTHNAME(created_at)')
        ->orderByRaw('MONTH(created_at)')
        ->get();

        //expense 
        $chart_expense_year = DB::table('expenses')
        ->selectRaw('MONTHNAME(created_at) as month, 
                    SUM(CASE WHEN shop_id = \'' . $shop_id . '\' THEN amount ELSE 0 END) as expense_total')
        ->groupByRaw('MONTH(created_at), MONTHNAME(created_at)')
        ->orderByRaw('MONTH(created_at)')
        ->get();
        // Array untuk menyimpan data hasil query
        $transaction_date = [];
        $sales_total = [];
 

        // Mengisi array untuk setiap bulan dari Januari hingga Desember
        for ($i = 1; $i <= 12; $i++) {
            $monthName = date('F', mktime(0, 0, 0, $i, 10)); // Mengambil nama bulan dari nomor bulan

            $found = false;

            // Mencari data yang sesuai dari hasil query
            foreach ($chart_sales_year as $result) {
                if ($result->month === $monthName) {
                    $transaction_date[] = $result->month;
                    $sales_total[] = (int) $result->sales_total;
                 
                    $found = true;
                    break;
                }
            }

            // Jika data tidak ditemukan untuk bulan tersebut, set nilai default
            if (!$found) {
                $transaction_date[] = $monthName;
                $sales_total[] = 0;
         
            }
        }

           // Array untuk menyimpan data hasil query
           $expense_date = [];
           $expense_total = [];
           
         // Mengisi array untuk setiap bulan dari Januari hingga Desember
        for ($i = 1; $i <= 12; $i++) {
            $monthName = date('F', mktime(0, 0, 0, $i, 10)); // Mengambil nama bulan dari nomor bulan

            $found = false;

            // Mencari data yang sesuai dari hasil query
            foreach ($chart_expense_year as $result) {
                if ($result->month === $monthName) {
                    $expense_date[] = $result->month;
                    $expense_total[] = (int) $result->expense_total;
                 
                    $found = true;
                    break;
                }
            }

            // Jika data tidak ditemukan untuk bulan tersebut, set nilai default
            if (!$found) {
                $expense_date[] = $monthName;
                $expense_total[] = 0;
         
            }
        }
        $transaction_income = Transaction::where('shop_id',$shop_id)->sum('grand_total');
        $transaction_expend = Expense::where('shop_id',$shop_id)->sum('amount');
        return response()->json([
            'success' => true,
            'data'    => [$transaction_date,$sales_total,$transaction_expend,$transaction_income,$expense_date, $expense_total]
        ]);
    }

}