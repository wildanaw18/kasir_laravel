<?php

namespace App\Http\Controllers\Api\Admin\Master;

use App\Http\Controllers\Controller;
use App\Http\Resources\UnitResource;
use App\Models\Master\Unit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class UnitController extends Controller
{
  
    public function index()
    {
        $auth = Auth::user()->type_user;
        $shop_id = Auth::user()->shop_id;
        $branch_id = Auth::user()->branch_id;
        
        if($auth == 1){
            $units = Unit::when(request()->search, function($units){
                $units = $units->where('unit_name', 'like', '%'. request()->search . '%');
            })->selectRaw('*, ROW_NUMBER() OVER (ORDER BY id) as no')->paginate(5);

            //append query string to pagination
            $units->appends(['search' => request()->search]);
        }else if($auth == 2){
            $units = Unit::when(request()->search, function($units){
                $units = $units->where('unit_name', 'like', '%'. request()->search . '%');
            })->where('shop_id',$shop_id)->selectRaw('*, ROW_NUMBER() OVER (ORDER BY id) as no')->paginate(5);

            //append query string to pagination
            $units->appends(['search' => request()->search]);
        }else{
            $units = Unit::when(request()->search, function($units){
                $units = $units->where('unit_name', 'like', '%'. request()->search . '%');
            })->where('shop_id',$shop_id)->where('branch_id',$branch_id)->selectRaw('*, ROW_NUMBER() OVER (ORDER BY id) as no')->paginate(5);

            //append query string to pagination
            $units->appends(['search' => request()->search]);
        }
        //return with api resource
        return new UnitResource(true, 'List Data unit', $units);
    }

    public function store(Request $request)
    {
       
        $validator = Validator::make($request->all(), [
            'unit_name'          => 'required',
    
            
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        //create unit
        $unit = Unit::create([
            'unit_name'          => $request->unit_name,
            'shop_id'            => Auth::user()->shop_id,
            'branch_id'          => Auth::user()->branch_id,
            'user_id'            => Auth::user()->id,
        ]);

    

        if($unit) {
            //return success with Api Resource
            return new UnitResource(true, 'Data unit Berhasil Disimpan!', $unit);
        }

        //return failed with Api Resource
        return new UnitResource(false, 'Data unit Gagal Disimpan!', null);
    }

    public function show($id)
    {
        $unit = Unit::whereId($id)->first();
        
        if($unit) {
            //return success with Api Resource
            return new UnitResource(true, 'Detail Data unit!', $unit);
        }

        //return failed with Api Resource
        return new UnitResource(false, 'Detail Data unit Tidak DItemukan!', null);
    }

    public function update(Request $request, Unit $unit)
    {
        $validator = Validator::make($request->all(), [
            'unit_name'          => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

       
        //update unit without password
        $unit->update([
            'unit_name'     => $request->unit_name,
            'shop_id'       => Auth::user()->shop_id,
            'updated_by'    => Auth::user()->id,
           
        ]);



        if($unit) {
            //return success with Api Resource
            return new UnitResource(true, 'Data unit Berhasil Diupdate!', $unit);
        }

        //return failed with Api Resource
        return new UnitResource(false, 'Data unit Gagal Diupdate!', null);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
