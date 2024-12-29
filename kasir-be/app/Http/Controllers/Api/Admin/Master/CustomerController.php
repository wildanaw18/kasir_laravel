<?php

namespace App\Http\Controllers\Api\Admin\Master;

use App\Http\Controllers\Controller;
use App\Http\Resources\CustomerResource;
use App\Models\Master\Customer;
use App\Models\Master\Shop;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use DB;

class CustomerController extends Controller
{
   
    public function index()
    {
        $auth = Auth::user()->type_user;
        $shop_id = Auth::user()->shop_id;
        $branch_id = Auth::user()->branch_id;
        
        if($auth == 1){
            $customers = Customer::when(request()->search, function($customers){
                $customers = $customers->where('customer_name', 'like', '%'. request()->search . '%');
            })->selectRaw('*, ROW_NUMBER() OVER (ORDER BY id) as no')->paginate(5);
        }else if($auth == 2){
            $customers = Customer::when(request()->search, function($customers){    
                $customers = $customers->where('customer_name', 'like', '%'. request()->search . '%');
            })->where('shop_id',$shop_id)->selectRaw('*, ROW_NUMBER() OVER (ORDER BY id) as no')->paginate(5);
        }else{
            $customers = Customer::when(request()->search, function($customers){    
                $customers = $customers->where('customer_name', 'like', '%'. request()->search . '%');
            })->where('shop_id',$shop_id)->where('branch_id',$branch_id)->selectRaw('*, ROW_NUMBER() OVER (ORDER BY id) as no')->paginate(5);
        }
            //append query string to pagination
            $customers->appends(['search' => request()->search]);
    
            //return with api resource
            return new CustomerResource(true, 'List Data Customer', $customers);
    }

    public function store(Request $request)
    {
   
        $validator = Validator::make($request->all(), [
            'customer_name'          => 'required',
            
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        $shop = User::with('shop')->where('id', Auth::user()->id)->first();
        $tlc = $shop->shop->header_inv.'CS';
        $max = DB::select("SELECT MAX(RIGHT(customer_id,4)) AS customer_id FROM customers WHERE customer_id LIKE '%$tlc%'");
        $no="0";
        foreach ($max as $a){
            $no=$a->customer_id;
        }
        // dd($max);
        $customer_id = "0001";
        if($no>0){
            $customer_id = $no+1;
            $customer_id = sprintf("%04s", $customer_id);
        }
        $customer_ids = "$tlc$customer_id";

        
        //create Customer
        $customer = Customer::create([
            'customer_name' => $request->customer_name,
            'customer_id'   => $customer_ids,
            // 'province_id'   => $request->province_id,
            'phone'         => $request->phone,
            'address'       => $request->address,
            'shop_id'       => Auth::user()->shop_id,
            'branch_id'       => Auth::user()->branch_id,
            'user_id'       => Auth::user()->id,
        ]);

    

        if($customer) {
            //return success with Api Resource
            return new CustomerResource(true, 'Data status Berhasil Disimpan!', $customer);
        }

        //return failed with Api Resource
        return new CustomerResource(false, 'Data status Gagal Disimpan!', null);
    }

    public function show($id)
    {
        $customer = Customer::whereId($id)->first();
        
        if($customer) {
            //return success with Api Resource
            return new CustomerResource(true, 'Detail Data status!', $customer);
        }

        //return failed with Api Resource
        return new CustomerResource(false, 'Detail Data Customer Tidak DItemukan!', null);
    }

    public function update(Request $request, Customer $customer)
    {
        $validator = Validator::make($request->all(), [
            'customer_name'          => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

       
        //update status without password
        $customer->update([
            'customer_name' => $request->customer_name,
            // 'province_id'   => $request->province_id,
            'phone'         => $request->phone,
            'address'       => $request->address,
            'shop_id'       => Auth::user()->shop_id,
            'updated_by'    => Auth::user()->id,
           
        ]);



        if($customer) {
            //return success with Api Resource
            return new CustomerResource(true, 'Data Customer Berhasil Diupdate!', $customer);
        }

        //return failed with Api Resource
        return new CustomerResource(false, 'Data Customer Gagal Diupdate!', null);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
