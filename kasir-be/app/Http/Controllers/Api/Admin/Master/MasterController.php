<?php

namespace App\Http\Controllers\Api\Admin\Master;

use App\Http\Controllers\Controller;
use App\Http\Resources\MasterResource;
use App\Models\Airport;
use App\Models\Bank;
use App\Models\Booking;
use App\Models\CareTaker;
use App\Models\Commodity;
use App\Models\Config;
use App\Models\Country;
use App\Models\Master\Branch;
use App\Models\Master\Customer;
use App\Models\Flight;
use App\Models\Good;
use App\Models\Master\Category;
use App\Models\Master\City;
use App\Models\Master\Group;
use App\Models\Master\Shop;
use App\Models\Master\Size;
use App\Models\Master\Unit;
use App\Models\OtherCharge;
use App\Models\Packing;
use App\Models\Plane;
use App\Models\Product\Product;
use App\Models\Stamp;
use App\Models\Status;
use App\Models\Tax;
use App\Models\Transaction\Cart;
use App\Models\User;
use App\Models\Vendor;
use DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MasterController extends Controller
{
    public function index(Request $request)
    {
        
        $user = Auth::user()->user_type;
        
        $auth = Auth::user()->type_user;
        $shop_id = Auth::user()->shop_id;
        $branch_id = Auth::user()->branch_id;
        
        $request_json = json_decode($request->header('request'));

        $res = [];
       // Memeriksa jika data "branch" ada
        if (in_array("user", $request_json)) {
            $res["user"] = User::select('user_name AS label','id AS value')->get();
        }

        if (in_array("city", $request_json)) {
            $res["city"] = City::select('city_name AS label','id AS value')->get();
        }
        if (in_array("branch", $request_json)) {
            $res["branch"] = Branch::select('branch_name AS label','id AS value')->get();
        }
        if (in_array("shop", $request_json)) {
            $res["shop"] = Shop::select('shop_name AS label','id AS value')->get();
        }
        if (in_array("group", $request_json)) {
            $res["group"] = Group::select('name AS label','id AS value')->get();
        }

        if (in_array("category", $request_json)) {
            if($auth == 1){
                $res["category"] = Category::select('name AS label','id AS value')->where('group_id',2)->get();
            }else if($auth == 2){
                $res["category"] = Category::where('shop_id',$shop_id)->select('name AS label','id AS value')->where('group_id',2)->get();      
            }else{
                $res["category"] = Category::where('shop_id',$shop_id)->where('branch_id',$branch_id)->select('name AS label','id AS value')->where('group_id',2)->get();  
            }
        }
        if (in_array("customers", $request_json)) {
            if($auth == 1){
                $res["customers"] = Customer::select('customer_name AS label','id AS value')->get();
            }else if($auth == 2){
                $res["customers"] = Customer::where('shop_id',$shop_id)->select('customer_name AS label','id AS value')->get(); 
            }else{
                $res["customers"] = Customer::where('shop_id',$shop_id)->where('branch_id',$branch_id)->select('customer_name AS label','id AS value')->get(); 
            }
        }
        if (in_array("unit", $request_json)) {
            if($auth == 1){
                $res["unit"] = Unit::select('unit_name AS label','id AS value')->get();
            }else if($auth == 2){
                $res["unit"] = Unit::where('shop_id',$shop_id)->select('unit_name AS label','id AS value')->get();    
            }else{
                $res["unit"] = Unit::where('shop_id',$shop_id)->where('branch_id',$branch_id)->select('unit_name AS label','id AS value')->get();    
            }
        }
        if (in_array("size", $request_json)) {
            if($auth == 1){
                $res["size"] = Size::select('name AS label','id AS value')->get();
            }else if($auth == 2){
                $res["size"] = Size::where('shop_id',$shop_id)->select('name AS label','id AS value')->get();
            }else{
                $res["size"] = Size::where('shop_id',$shop_id)->where('branch_id',$branch_id)->select('name AS label','id AS value')->get();
            }
        }
        if (in_array("product", $request_json)) {
            if($auth == 1){
                $res["product"] = Product::get();
            }else if($auth == 2){
                $res["product"] = Product::where('shop_id',$shop_id)->get();
            }else{
                $res["product"] = Product::where('shop_id',$shop_id)->where('branch_id',$branch_id)->get();
            }
        }
        if (in_array("category_expenses", $request_json)) {
            if($auth == 1){
                $res["category_expenses"] = Category::select('name AS label','id AS value')->where('group_id',1)->get();
            }else if($auth == 2){
                $res["category_expenses"] = Category::where('shop_id',$shop_id)->select('name AS label','id AS value')->where('group_id',1)->get();     
            }else{
                $res["category_expenses"] = Category::where('shop_id',$shop_id)->where('branch_id',$branch_id)->select('name AS label','id AS value')->where('group_id',1)->get();
            }
        }
       
        
      
        

        
        // Mengembalikan data dalam bentuk JSON
        return response()->json([
            'success' => true,
            'message' => 'List Data Customers',
            'data' => $res,
        ]);
    }
}
