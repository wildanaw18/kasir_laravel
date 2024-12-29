<?php

namespace App\Http\Controllers\Api\Admin\Master;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function index()
    {
        $users = User::when(request()->search, function($users){
            $users = $users->where('name', 'like', '%'. request()->search . '%');
        })->with('roles')->latest()->paginate(5);

        //append query string to pagination
        $users->appends(['search' => request()->search]);

        //return with api resource
        return new UserResource(true, 'List Data Users', $users);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'          => 'required',
            'user_name'     => 'required',
            'email'         => 'required|unique:users',
            // 'password'      => 'required|confirmed',
            'branch_id'     => 'required',
            // 'shipper_account_id'   => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        //create user
        $user = User::create([
            'name'          => $request->name,
            'user_name'     => $request->user_name,
            'email'         => $request->email,
            'password'      => bcrypt($request->password),

            'branch_id'     => $request->branch_id,
            'shop_id'       => $request->shop_id,
            'active_id'     => 1,
            'type_user'     => $request->user_type,
            'created_by'    => Auth::user()->id,
        ]);

        //assign roles to user
        $user->assignRole($request->roles);

        if($user) {
            //return success with Api Resource
            return new UserResource(true, 'Data User Berhasil Disimpan!', $user);
        }

        //return failed with Api Resource
        return new UserResource(false, 'Data User Gagal Disimpan!', null);
    }

    public function show($id)
    {
        $user = User::with('roles','branch','shop')->whereId($id)->first();
        
        if($user) {
            //return success with Api Resource
            return new UserResource(true, 'Detail Data User!', $user);
        }

        //return failed with Api Resource
        return new UserResource(false, 'Detail Data User Tidak DItemukan!', null);
    }

    public function update(Request $request, User $user)
    {
        // $validator = Validator::make($request->all(), [
        //     'name'          => 'required',
        //     'user_name'     => 'required',
        //     // 'email'         => 'required|unique:users',
        //     // 'password'      => 'required|confirmed',
        //     'branch_id'     => 'required',
        //     'shipper_account_id'   => 'required',
        // ]);

        // if ($validator->fails()) {
        //     return response()->json($validator->errors(), 422);
        // }

        if($request->password == "") {

            //update user without password
            $user->update([
                'name'          => $request->name,
                'user_name'     => $request->user_name,
                'email'         => $request->email,
    
                'branch_id'     => $request->branch_id,
                'shop_id'       => $request->shop_id,
                'active_id'     => $request->active_id,
                'type_user'     => $request->type_user,
                'updated_by'    => Auth::user()->id,
            ]);

        } else {

            //update user with new password
            $user->update([
                'name'          => $request->name,
                'user_name'     => $request->user_name,
                'email'         => $request->email,
                'password'      => bcrypt($request->password),
                'customer_id'   => $request->customer_id,
                'branch_id'     => $request->branch_id,
                'shop_id'       => $request->shop_id,
                'active_id'     => $request->active_id,
                'type_user'     => $request->type_user,
                'updated_by'    => Auth::user()->id,
            ]);

        }

        //assign roles to user
        $user->syncRoles($request->roles);

        if($user) {
            //return success with Api Resource
            return new UserResource(true, 'Data User Berhasil Diupdate!', $user);
        }

        //return failed with Api Resource
        return new UserResource(false, 'Data User Gagal Diupdate!', null);
    }
}
