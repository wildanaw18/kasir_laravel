<?php

namespace App\Http\Controllers\Api\Admin\Master;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Product\Product;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use DB;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ProductController extends Controller
{
    public function index()
    {
        $auth = Auth::user()->type_user;
        $shop_id = Auth::user()->shop_id;
        $branch_id = Auth::user()->branch_id;
        
        if($auth == 1){

            if(request()->search && request()->keywords == null ){
                $products = Product::when(request()->search, function($products){
                    $products = $products->where('title', 'like', '%'. request()->search . '%')->orWhere('category_id', 'like', '%'. request()->search. '%');
                })->with('size','unit','category')->selectRaw('*, ROW_NUMBER() OVER (ORDER BY id) as no')->paginate(8);
                  //append query string to pagination
                $products->appends(['search' => request()->search]);
            }elseif(request()->keywords && request()->search == null){
                $products = Product::when(request()->keywords, function($products){
                    $products = $products->where('title', 'like', '%'. request()->keywords . '%')->orWhere('category_id', 'like', '%'. request()->keywords. '%');
                })->with('size','unit','category')->selectRaw('*, ROW_NUMBER() OVER (ORDER BY id) as no')->paginate(8);
                    //append query string to pagination
                $products->appends(['keywords' => request()->keywords]);
            }elseif(request()->keywords && request()->search){
    
                    $products = Product::when(request()->keywords && request()->search, function($products){
                        $products = $products->where('title', 'like', '%'. request()->keywords . '%');
                    })->where('category_id', request()->search)->with('size','unit','category')->selectRaw('*, ROW_NUMBER() OVER (ORDER BY id) as no')->paginate(8);
                        //append query string to pagination
                    $products->appends(['keywords' => request()->keywords]);
            
            }else{
                $products = Product::when(request()->search, function($products){
                    $products = $products->where('title', 'like', '%'. request()->keywords . '%')->orWhere('category_id', 'like', '%'. request()->search. '%');
                })->with('size','unit','category')->selectRaw('*, ROW_NUMBER() OVER (ORDER BY id) as no')->paginate(8);
                    //append query string to pagination
                $products->appends(['search' => request()->search]);
            }

        }else if($auth == 2){

             if(request()->search && request()->keywords == null ){
                $products = Product::when(request()->search, function($products){
                    $products = $products->where('title', 'like', '%'. request()->search . '%')->orWhere('category_id', 'like', '%'. request()->search. '%');
                })->with('size','unit','category')->where('shop_id', $shop_id)->selectRaw('*, ROW_NUMBER() OVER (ORDER BY id) as no')->paginate(8);
                //append query string to pagination
                $products->appends(['search' => request()->search]);
            }elseif(request()->keywords && request()->search == null){
                $products = Product::when(request()->keywords, function($products){
                    $products = $products->where('title', 'like', '%'. request()->keywords . '%')->orWhere('category_id', 'like', '%'. request()->keywords. '%');
                })->with('size','unit','category')->where('shop_id', $shop_id)->selectRaw('*, ROW_NUMBER() OVER (ORDER BY id) as no')->paginate(8);
                    //append query string to pagination
                $products->appends(['keywords' => request()->keywords]);
            }elseif(request()->keywords && request()->search){

                    $products = Product::when(request()->keywords && request()->search, function($products){
                        $products = $products->where('title', 'like', '%'. request()->keywords . '%');
                    })->where('shop_id', $shop_id)->where('category_id', request()->search)->with('size','unit','category')->selectRaw('*, ROW_NUMBER() OVER (ORDER BY id) as no')->paginate(8);
                        //append query string to pagination
                    $products->appends(['keywords' => request()->keywords]);
            
            }else{
                $products = Product::when(request()->search, function($products){
                    $products = $products->where('title', 'like', '%'. request()->keywords . '%')->orWhere('category_id', 'like', '%'. request()->search. '%');
                })->where('shop_id', $shop_id)->with('size','unit','category')->selectRaw('*, ROW_NUMBER() OVER (ORDER BY id) as no')->paginate(8);
                    //append query string to pagination
                $products->appends(['search' => request()->search]);
            }

        }else{
            
            if(request()->search && request()->keywords == null ){
                $products = Product::when(request()->search, function($products){
                    $products = $products->where('title', 'like', '%'. request()->search . '%')->orWhere('category_id', 'like', '%'. request()->search. '%');
                })->with('size','unit','category')->where('shop_id', $shop_id)->where('branch_id', $branch_id)->selectRaw('*, ROW_NUMBER() OVER (ORDER BY id) as no')->paginate(8);
                  //append query string to pagination
                $products->appends(['search' => request()->search]);
            }elseif(request()->keywords && request()->search == null){
                $products = Product::when(request()->keywords, function($products){
                    $products = $products->where('title', 'like', '%'. request()->keywords . '%')->orWhere('category_id', 'like', '%'. request()->keywords. '%');
                })->with('size','unit','category')->where('shop_id', $shop_id)->where('branch_id', $branch_id)->selectRaw('*, ROW_NUMBER() OVER (ORDER BY id) as no')->paginate(8);
                    //append query string to pagination
                $products->appends(['keywords' => request()->keywords]);
            }elseif(request()->keywords && request()->search){
    
                    $products = Product::when(request()->keywords && request()->search, function($products){
                        $products = $products->where('title', 'like', '%'. request()->keywords . '%');
                    })->where('shop_id', $shop_id)->where('branch_id', $branch_id)->where('category_id', request()->search)->with('size','unit','category')->selectRaw('*, ROW_NUMBER() OVER (ORDER BY id) as no')->paginate(8);
                        //append query string to pagination
                    $products->appends(['keywords' => request()->keywords]);
            
            }else{
                $products = Product::when(request()->search, function($products){
                    $products = $products->where('title', 'like', '%'. request()->keywords . '%')->orWhere('category_id', 'like', '%'. request()->search. '%');
                })->where('shop_id', $shop_id)->where('branch_id', $branch_id)->with('size','unit','category')->selectRaw('*, ROW_NUMBER() OVER (ORDER BY id) as no')->paginate(8);
                    //append query string to pagination
                $products->appends(['search' => request()->search]);
            }
        }    
       
       

      
 
        //return with api resource
        return new ProductResource(true, 'List Data Branch', $products);
    }

    public function store(Request $request)
    {
   
        $validator = Validator::make($request->all(), [
            'title'          => 'required',
            // 'product_id'     => 'required',
            'category_id'    => 'required',
            'buy_price'      => 'required',
            'sell_price'     => 'required',
            'stock'          => 'required',
            'image'          => 'required',
            
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        
        $tlc = "PR";
        $max = DB::select("SELECT MAX(RIGHT(product_id,4)) AS product_id FROM products WHERE product_id LIKE '%$tlc%'");
        $no="0";
        foreach ($max as $a){
            $no=$a->product_id;
        }
        // dd($max);
        $product_id = "0001";
        if($no>0){
            $product_id = $no+1;
            $product_id = sprintf("%04s", $product_id);
        }
        $product_ids = "$tlc$product_id";
        //upload image
        $image = $request->file('image');
        $image->storeAs('public/products', $image->hashName());
        
        //create Branch
        $product = Product::create([
            'title'   => $request->title,
            // 'province_id'   => $request->province_id,
            'product_id'        => $product_ids,
            'image'             => $image->hashName(),
            'category_id'       => $request->category_id,
            'unit_id'           => $request->unit_id,
            'size_id'           => $request->size_id,
            'barcode'           => $request->barcode,
            'buy_price'         => $request->buy_price,
            'sell_price'        => $request->sell_price,
            'stock'             => $request->stock,
            'desc'              => $request->desc,
            'shop_id'           => Auth::user()->shop_id,
            'branch_id'         => Auth::user()->branch_id,
            'user_id'           => Auth::user()->id,
        ]);

    

        if($product) {
            //return success with Api Resource
            return new ProductResource(true, 'Data Product Berhasil Disimpan!', $product);
        }

        //return failed with Api Resource
        return new ProductResource(false, 'Data Product Gagal Disimpan!', null);
    }

    public function show($id)
    {
        $product = Product::with('size','category','unit')->whereId($id)->first();
        
        if($product) {
            //return success with Api Resource
            return new ProductResource(true, 'Detail Data Product!', $product);
        }

        //return failed with Api Resource
        return new ProductResource(false, 'Detail Data Branch Tidak DItemukan!', null);
    }

    public function update(Request $request, Product $product)
    {
        $validator = Validator::make($request->all(), [
            'title'          => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

          //check image update
          if ($request->file('image')) {

            //remove old image
            Storage::disk('local')->delete('public/products/'.basename($product->image));
        
            //upload new image
            $image = $request->file('image');
            $image->storeAs('public/products', $image->hashName());

            //update Product without password
            $product->update([
                'title'   => $request->title,
                // 'province_id'   => $request->province_id,
                'image'             => $image->hashName(),
                'category_id'       => $request->category_id,
                'unit_id'           => $request->unit_id,
                'size_id'           => $request->size_id,
                'barcode'           => $request->barcode,
                'buy_price'         => $request->buy_price,
                'sell_price'        => $request->sell_price,
                'stock'             => $request->stock,
                'desc'              => $request->desc,
                'shop_id'           => Auth::user()->shop_id,
                'updated_by'        => Auth::user()->id,
            
            ]);
          }
            $product->update([
                'title'   => $request->title,
                // 'province_id'   => $request->province_id,
                'category_id'       => $request->category_id,
                'unit_id'           => $request->unit_id,
                'size_id'           => $request->size_id,
                'barcode'           => $request->barcode,
                'buy_price'         => $request->buy_price,
                'sell_price'        => $request->sell_price,
                'stock'             => $request->stock,
                'desc'              => $request->desc,
                'shop_id'           => Auth::user()->shop_id,
                'updated_by'        => Auth::user()->id,
            
            ]);


        if($product) {
            //return success with Api Resource
            return new ProductResource(true, 'Data Product Berhasil Diupdate!', $product);
        }

        //return failed with Api Resource
        return new ProductResource(false, 'Data Product Gagal Diupdate!', null);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json([
                'success' => false,
                'message' => 'Product not found.'
            ], Response::HTTP_NOT_FOUND);
        }

        // Delete the product image from storage
        Storage::delete('public/products/' . $product->image);

        // Delete the product record from the database
        if ($product->delete()) {
            return response()->json([
                'success' => true,
                'message' => 'Product deleted successfully.'
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete product.'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
