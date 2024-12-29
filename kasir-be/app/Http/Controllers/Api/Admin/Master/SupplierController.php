<?php

namespace App\Http\Controllers\Api\Admin\Master;

use App\Http\Controllers\Controller;
use App\Http\Resources\SupplierResource;
use App\Models\Master\Shop;
use App\Models\Master\Supplier;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use DB;

class SupplierController extends Controller
{
    
    public function index()
    {
        $auth = Auth::user()->type_user;
        $shop_id = Auth::user()->shop_id;
        $branch_id = Auth::user()->branch_id;
        
        if($auth == 1){
            $suppliers = Supplier::when(request()->search, function($suppliers){
                $suppliers = $suppliers->where('supplier_name', 'like', '%'. request()->search . '%');
            })->selectRaw('*, ROW_NUMBER() OVER (ORDER BY id) as no')->paginate(5);

            //append query string to pagination
            $suppliers->appends(['search' => request()->search]);
        }else if($auth == 2){
            $suppliers = Supplier::when(request()->search, function($suppliers){
                $suppliers = $suppliers->where('supplier_name', 'like', '%'. request()->search . '%');
            })->where('shop_id',$shop_id)->selectRaw('*, ROW_NUMBER() OVER (ORDER BY id) as no')->paginate(5);

            //append query string to pagination
            $suppliers->appends(['search' => request()->search]);
        }else{
            $suppliers = Supplier::when(request()->search, function($suppliers){
                $suppliers = $suppliers->where('supplier_name', 'like', '%'. request()->search . '%');
            })->where('shop_id',$shop_id)->where('branch_id',$branch_id)->selectRaw('*, ROW_NUMBER() OVER (ORDER BY id) as no')->paginate(5);

            //append query string to pagination
            $suppliers->appends(['search' => request()->search]);
        }
        //return with api resource
        return new SupplierResource(true, 'List Data Supplier', $suppliers);
    }

    public function store(Request $request)
    {
   
        $validator = Validator::make($request->all(), [
            'supplier_name'          => 'required',
            
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        $shop = User::with('shop')->where('id', Auth::user()->id)->first();
        $tlc = $shop->shop->header_inv.'SP';
        $max = DB::select("SELECT MAX(RIGHT(supplier_id,4)) AS supplier_id FROM suppliers WHERE supplier_id LIKE '%$tlc%'");
        $no="0";
        foreach ($max as $a){
            $no=$a->supplier_id;
        }
        // dd($max);
        $supplier_id = "0001";
        if($no>0){
            $supplier_id = $no+1;
            $supplier_id = sprintf("%04s", $supplier_id);
        }
        $supplier_ids = "$tlc$supplier_id";

        
        //create Supplier
        $supplier = Supplier::create([
            'supplier_name' => $request->supplier_name,
            'supplier_id'   => $supplier_ids,
            // 'province_id'   => $request->province_id,
            'phone'         => $request->phone,
            'status'        => 1,
            'address'       => $request->address,
            'shop_id'       => Auth::user()->shop_id,
            'user_id'       => Auth::user()->id,
        ]);

    

        if($supplier) {
            //return success with Api Resource
            return new SupplierResource(true, 'Data status Berhasil Disimpan!', $supplier);
        }

        //return failed with Api Resource
        return new SupplierResource(false, 'Data status Gagal Disimpan!', null);
    }

    public function show($id)
    {
        $supplier = Supplier::whereId($id)->first();
        
        if($supplier) {
            //return success with Api Resource
            return new SupplierResource(true, 'Detail Data status!', $supplier);
        }

        //return failed with Api Resource
        return new SupplierResource(false, 'Detail Data Supplier Tidak DItemukan!', null);
    }

    public function update(Request $request, Supplier $supplier)
    {
        $validator = Validator::make($request->all(), [
            'supplier_name'          => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

       
        //update status without password
        $supplier->update([
            'supplier_name' => $request->supplier_name,
            // 'province_id'   => $request->province_id,
            'phone'         => $request->phone,
            'address'       => $request->address,
            'shop_id'       => Auth::user()->shop_id,
            'updated_by'    => Auth::user()->id,
           
        ]);



        if($supplier) {
            //return success with Api Resource
            return new SupplierResource(true, 'Data Supplier Berhasil Diupdate!', $supplier);
        }

        //return failed with Api Resource
        return new SupplierResource(false, 'Data Supplier Gagal Diupdate!', null);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
