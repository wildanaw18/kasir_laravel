<?php

namespace App\Http\Controllers\Api\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class LoginController extends Controller
{
    public function index(Request $request)
    {
        //set validasi
        $validator = Validator::make($request->all(), [
            'user_name'     => 'required',
            'password'      => 'required'
        ]);

        //response error validasi
        if($validator->fails()){
            return response()->json($validator->errors(), 422);
        }

        //get username dan password dari input
        $credentials = $request->only('user_name', 'password');

        //check jika 'user' dan 'password' tidak sesuai

        if(!$token = auth()->guard('api')->attempt($credentials)){

            //response login "failed"
            return response()->json([
                'success'   => false,
                'message'   => 'Username or password is incorrect'
            ], 400);
        }

        //response login 'success' dengan generate 'token'
        return response()->json([
            'success'       => true,
            'user'          => auth()->guard('api')->user()->only(['user_name','email','name','id','customer_id','user_type']),
            'permissions'   => auth()->guard('api')->user()->getPermissionArray(),
            'token'         => $token,
        ], 200);
    }

    public function logout()
    {
        //remove "token" JWT
        JWTAuth::invalidate(JWTAuth::getToken());

        //response "success" logout
        return response()->json([

        ]);
    }
}
