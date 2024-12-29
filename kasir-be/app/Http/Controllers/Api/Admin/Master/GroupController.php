<?php

namespace App\Http\Controllers\Api\Admin\Master;

use App\Http\Controllers\Controller;
use App\Http\Resources\GroupResource;
use App\Models\Master\Group;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class GroupController extends Controller
{
    public function index()
    {
        $groups = Group::when(request()->search, function($groups){
            $groups = $groups->where('name', 'like', '%'. request()->search . '%');
        })->selectRaw('*, ROW_NUMBER() OVER (ORDER BY id) as no')->paginate(5);

        //append query string to pagination
        $groups->appends(['search' => request()->search]);
 
        //return with api resource
        return new GroupResource(true, 'List Data Group', $groups);
    }

    public function store(Request $request)
    {
       
        $validator = Validator::make($request->all(), [
            'name'          => 'required',
    
            
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        //create Group
        $group = Group::create([
            'name'          => $request->name,
            'desc'          => $request->desc,
            'created_by'    => Auth::user()->id,
        ]);

    

        if($group) {
            //return success with Api Resource
            return new GroupResource(true, 'Data status Berhasil Disimpan!', $group);
        }

        //return failed with Api Resource
        return new GroupResource(false, 'Data status Gagal Disimpan!', null);
    }

    public function show($id)
    {
        $group = Group::whereId($id)->first();
        
        if($group) {
            //return success with Api Resource
            return new GroupResource(true, 'Detail Data status!', $group);
        }

        //return failed with Api Resource
        return new GroupResource(false, 'Detail Data Group Tidak DItemukan!', null);
    }

    public function update(Request $request, Group $group)
    {
        $validator = Validator::make($request->all(), [
            'name'          => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

       
        //update status without password
        $group->update([
            'name'          => $request->name,
            'desc'          => $request->desc,
            'updated_by'    => Auth::user()->id,
           
        ]);



        if($group) {
            //return success with Api Resource
            return new GroupResource(true, 'Data Group Berhasil Diupdate!', $group);
        }

        //return failed with Api Resource
        return new GroupResource(false, 'Data Group Gagal Diupdate!', null);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
