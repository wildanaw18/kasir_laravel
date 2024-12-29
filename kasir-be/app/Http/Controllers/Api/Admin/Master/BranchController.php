<?php

namespace App\Http\Controllers\Api\Admin\Master;

use App\Http\Controllers\Controller;
use App\Http\Resources\BranchResource;
use App\Models\Master\Branch;
use App\Models\Master\City;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use DB;
use Illuminate\Http\Request;

class BranchController extends Controller
{
    public function index()
    {
        $branchs = Branch::when(request()->search, function($branchs){
            $branchs = $branchs->where('branch_name', 'like', '%'. request()->search . '%');
        })->selectRaw('*, ROW_NUMBER() OVER (ORDER BY id) as no')->paginate(5);

        //append query string to pagination
        $branchs->appends(['search' => request()->search]);
 
        //return with api resource
        return new BranchResource(true, 'List Data Branch', $branchs);
    }

    public function store(Request $request)
    {
   
        $validator = Validator::make($request->all(), [
            'branch_name'          => 'required',
            
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $city = City::where('id',$request->city_id)->first();
        $province_id = $city->province_id;
        $tlc = $city->tlc;
        $max = DB::select("SELECT MAX(RIGHT(branch_code,2)) AS branch_code FROM branches WHERE branch_code LIKE '%$tlc$province_id%'");
        $no="0";
        foreach ($max as $a){
            $no=$a->branch_code;
        }
        // dd($max);
        $branch_code = "01";
        if($no>0){
            $branch_code = $no+1;
            $branch_code = sprintf("%02s", $branch_code);
        }
        $branch_codes = "$tlc$province_id$branch_code";

        
        //create Branch
        $branch = Branch::create([
            'branch_name'   => $request->branch_name,
            'branch_code'   => $branch_codes,
            // 'province_id'   => $request->province_id,
            'city_id'       => $request->city_id,
            'address'       => $request->address,
            'created_by'    => Auth::user()->id,
        ]);

    

        if($branch) {
            //return success with Api Resource
            return new BranchResource(true, 'Data Branch Berhasil Disimpan!', $branch);
        }

        //return failed with Api Resource
        return new BranchResource(false, 'Data Branch Gagal Disimpan!', null);
    }

    public function show($id)
    {
        $branch = Branch::with('city')->whereId($id)->first();
        
        if($branch) {
            //return success with Api Resource
            return new BranchResource(true, 'Detail Data Branch!', $branch);
        }

        //return failed with Api Resource
        return new BranchResource(false, 'Detail Data Branch Tidak DItemukan!', null);
    }

    public function update(Request $request, Branch $branch)
    {
        $validator = Validator::make($request->all(), [
            'branch_name'          => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

       
        //update Branch without password
        $branch->update([
            'branch_name'       => $request->branch_name,
            // 'province_id'       => $request->province_id,
            'city_id'           => $request->city_id,
            'address'           => $request->address,
            'updated_by'        => Auth::user()->id,
           
        ]);



        if($branch) {
            //return success with Api Resource
            return new BranchResource(true, 'Data Branch Berhasil Diupdate!', $branch);
        }

        //return failed with Api Resource
        return new BranchResource(false, 'Data Branch Gagal Diupdate!', null);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
