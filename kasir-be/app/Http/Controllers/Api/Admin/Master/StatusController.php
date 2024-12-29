<?php

namespace App\Http\Controllers\Api\Admin\Master;

use App\Http\Controllers\Controller;
use App\Http\Resources\StatusResource;
use App\Models\Master\Status;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class StatusController extends Controller
{
    public function index()
    {
        $statuses = Status::when(request()->search, function($statuses){
            $statuses = $statuses->where('name', 'like', '%'. request()->search . '%');
        })->selectRaw('*, ROW_NUMBER() OVER (ORDER BY id) as no')->paginate(5);

        //append query string to pagination
        $statuses->appends(['search' => request()->search]);
 
        //return with api resource
        return new StatusResource(true, 'List Data statuses', $statuses);
    }

    public function store(Request $request)
    {
       
        $validator = Validator::make($request->all(), [
            'name'          => 'required',
    
            
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        //create statuses
        $status = Status::create([
            'name'          => $request->name,
            'flag_status'   => $request->flag_status,
            'created_by'    => Auth::user()->id,
     
        ]);

    

        if($status) {
            //return success with Api Resource
            return new StatusResource(true, 'Data status Berhasil Disimpan!', $status);
        }

        //return failed with Api Resource
        return new StatusResource(false, 'Data status Gagal Disimpan!', null);
    }

    public function show($id)
    {
        $status = Status::whereId($id)->first();
        
        if($status) {
            //return success with Api Resource
            return new StatusResource(true, 'Detail Data status!', $status);
        }

        //return failed with Api Resource
        return new StatusResource(false, 'Detail Data status Tidak DItemukan!', null);
    }

    public function update(Request $request, status $status)
    {
        $validator = Validator::make($request->all(), [
            'name'          => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

       
        //update status without password
        $status->update([
            'name'          => $request->name,
            'flag_status'   => $request->flag_status,
            'updated_by'    => Auth::user()->id,
           
        ]);



        if($status) {
            //return success with Api Resource
            return new StatusResource(true, 'Data statuses Berhasil Diupdate!', $status);
        }

        //return failed with Api Resource
        return new StatusResource(false, 'Data statuses Gagal Diupdate!', null);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
