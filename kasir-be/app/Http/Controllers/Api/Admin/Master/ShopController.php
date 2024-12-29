<?php

namespace App\Http\Controllers\Api\Admin\Master;

use App\Http\Controllers\Controller;
use App\Http\Resources\ShopResource;
use App\Models\Master\Shop;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;

class ShopController extends Controller
{
    public function index()
    {
        $shops = Shop::when(request()->search, function($shops){
            $shops = $shops->where('shop_name', 'like', '%'. request()->search . '%');
        })->with('user')->selectRaw('*, ROW_NUMBER() OVER (ORDER BY id) as no')->where('status_id',1)->paginate(5);

        //append query string to pagination
        $shops->appends(['search' => request()->search]);
 
        //return with api resource
        return new ShopResource(true, 'List Data Group', $shops);
    }

    public function store(Request $request)
    {
       
        $validator = Validator::make($request->all(), [
            'shop_name'         => 'required',
            'header_inv'        => 'required|max:3',
            'address'           => 'required',
            'phone'             => 'required',
            'owner_name'        => 'required',
            'user_id'           => 'required',

        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        //upload image
        $image = $request->file('image');
        $image->storeAs('public/shops', $image->hashName());

        //create Shops
        $shop = Shop::create([
            'shop_name'             => $request->shop_name,
            'header_inv'            => $request->header_inv,
            'address'               => $request->address,
            'phone'                 => $request->phone,
            'owner_name'            => $request->owner_name,
            'image'                 => $image->hashName(),
            'user_id'               => $request->user_id,
            'created_by'            => Auth::user()->id,
        ]);

    

        if($shop) {
            //return success with Api Resource
            return new ShopResource(true, 'Data shop Berhasil Disimpan!', $shop);
        }

        //return failed with Api Resource
        return new ShopResource(false, 'Data shop Gagal Disimpan!', null);
    }

    public function show($id)
    {
        $shop = Shop::with('user')->whereId($id)->first();
        
        if($shop) {
            //return success with Api Resource
            return new ShopResource(true, 'Detail Data shop!', $shop);
        }

        //return failed with Api Resource
        return new ShopResource(false, 'Detail Data Group Tidak DItemukan!', null);
    }

    public function update(Request $request, Shop $shop)
    {
        $validator = Validator::make($request->all(), [
            'shop_name'         => 'required',
            'header_inv'        => 'required|max:3',
            'address'           => 'required',
            'phone'             => 'required',
            'owner_name'        => 'required',
            'user_id'           => 'required',

        ]);


        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

          //check image update
          if ($request->file('image')) {

            //remove old image
            Storage::disk('local')->delete('public/shops/'.basename($shop->image));
        
            //upload new image
            $image = $request->file('image');
            $image->storeAs('public/shops', $image->hashName());

            //update shop with new image
            $shop->update([
            'shop_name'             => $request->shop_name,
            'header_inv'            => $request->header_inv,
            'address'               => $request->address,
            'phone'                 => $request->phone,
            'owner_name'            => $request->owner_name,
            'image'                 => $image->hashName(),
            'user_id'               => $request->user_id,
            'updated_by'            => Auth::user()->id,
            ]);

        }
        //update shop without password
        $shop->update([
            'shop_name'             => $request->shop_name,
            'header_inv'            => $request->header_inv,
            'address'               => $request->address,
            'phone'                 => $request->phone,
            'owner_name'            => $request->owner_name,
            'user_id'               => $request->user_id,
            'updated_by'            => Auth::user()->id,
           
        ]);



        if($shop) {
            //return success with Api Resource
            return new ShopResource(true, 'Data Group Berhasil Diupdate!', $shop);
        }

        //return failed with Api Resource
        return new ShopResource(false, 'Data Group Gagal Diupdate!', null);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
