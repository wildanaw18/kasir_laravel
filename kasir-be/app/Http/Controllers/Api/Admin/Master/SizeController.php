<?php

namespace App\Http\Controllers\Api\Admin\Master;

use App\Http\Controllers\Controller;
use App\Http\Resources\SizeResource;
use App\Models\Master\Size;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class SizeController extends Controller
{
   
    public function index()
    {
        $auth = Auth::user()->type_user;
        $shop_id = Auth::user()->shop_id;
        $branch_id = Auth::user()->branch_id;
        
        if($auth == 1){
            $sizes = Size::when(request()->search, function($sizes){
                $sizes = $sizes->where('name', 'like', '%'. request()->search . '%');
            })->selectRaw('*, ROW_NUMBER() OVER (ORDER BY id) as no')->paginate(5);

            //append query string to pagination
            $sizes->appends(['search' => request()->search]);
        }else if($auth == 2){
            $sizes = Size::when(request()->search, function($sizes){
                $sizes = $sizes->where('name', 'like', '%'. request()->search . '%');
            })->where('shop_id',$shop_id)->selectRaw('*, ROW_NUMBER() OVER (ORDER BY id) as no')->paginate(5);

            //append query string to pagination
            $sizes->appends(['search' => request()->search]);
        }else{
            $sizes = Size::when(request()->search, function($sizes){
                $sizes = $sizes->where('name', 'like', '%'. request()->search . '%');
            })->where('shop_id',$shop_id)->where('branch_id',$branch_id)->selectRaw('*, ROW_NUMBER() OVER (ORDER BY id) as no')->paginate(5);

            //append query string to pagination
            $sizes->appends(['search' => request()->search]);
        }
 
        //return with api resource
        return new SizeResource(true, 'List Data Size', $sizes);
    }

    public function store(Request $request)
    {
       
        $validator = Validator::make($request->all(), [
            'name'          => 'required',
    
            
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        //create Size
        $size = Size::create([
            'name'          => $request->name,
            'shop_id'       => Auth::user()->shop_id,
            'branch_id'     => Auth::user()->branch_id,
            'user_id'       => Auth::user()->id,
        ]);

    

        if($size) {
            //return success with Api Resource
            return new SizeResource(true, 'Data size Berhasil Disimpan!', $size);
        }

        //return failed with Api Resource
        return new SizeResource(false, 'Data size Gagal Disimpan!', null);
    }

    public function show($id)
    {
        $size = Size::whereId($id)->first();
        
        if($size) {
            //return success with Api Resource
            return new SizeResource(true, 'Detail Data size!', $size);
        }

        //return failed with Api Resource
        return new SizeResource(false, 'Detail Data Size Tidak DItemukan!', null);
    }

    public function update(Request $request, Size $size)
    {
        $validator = Validator::make($request->all(), [
            'name'          => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

       
        //update size without password
        $size->update([
            'name'          => $request->name,
            'shop_id'       => Auth::user()->shop_id,
            'updated_by'    => Auth::user()->id,
           
        ]);



        if($size) {
            //return success with Api Resource
            return new SizeResource(true, 'Data Size Berhasil Diupdate!', $size);
        }

        //return failed with Api Resource
        return new SizeResource(false, 'Data Size Gagal Diupdate!', null);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
