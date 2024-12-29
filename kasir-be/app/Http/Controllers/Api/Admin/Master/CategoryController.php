<?php

namespace App\Http\Controllers\Api\Admin\Master;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Models\Master\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use DB;

class CategoryController extends Controller
{
    public function index()
    {
        $auth = Auth::user()->type_user;
        $shop_id = Auth::user()->shop_id;
        $branch_id = Auth::user()->branch_id;
        if($auth == 1){
            $categories = Category::when(request()->search, function($categories){
                $categories = $categories->where('name', 'like', '%'. request()->search . '%');
            })->with('shop','group')->selectRaw('*, ROW_NUMBER() OVER (ORDER BY id) as no')->paginate(5);
        }else if($auth == 2){
            $categories = Category::when(request()->search, function($categories){
                $categories = $categories->where('name', 'like', '%'. request()->search . '%');
            })->with('shop','group')->where('shop_id',$shop_id)->selectRaw('*, ROW_NUMBER() OVER (ORDER BY id) as no')->paginate(5);
        }else{
            $categories = Category::when(request()->search, function($categories){
                $categories = $categories->where('name', 'like', '%'. request()->search . '%');
            })->with('shop','group')->where('shop_id',$shop_id)->where('branch_id',$branch_id)->selectRaw('*, ROW_NUMBER() OVER (ORDER BY id) as no')->paginate(5);
        }


        //append query string to pagination
        $categories->appends(['search' => request()->search]);
 
        //return with api resource
        return new CategoryResource(true, 'List Data Category', $categories);
    }

    public function store(Request $request)
    {
       
        $validator = Validator::make($request->all(), [
            'name'              => 'required',
            'group_id'          => 'required',
    
            
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }


        //create Category
        $category = Category::create([
            'name'          => $request->name,
            'description'   => $request->desc,
            'group_id'      => $request->group_id,
            'shop_id'       => Auth::user()->shop_id,
            'branch_id'     => Auth::user()->branch_id,
            'status_id'     => 1,
            'user_id'       => Auth::user()->id,
        ]);

    

        if($category) {
            //return success with Api Resource
            return new CategoryResource(true, 'Data category Berhasil Disimpan!', $category);
        }

        //return failed with Api Resource
        return new CategoryResource(false, 'Data category Gagal Disimpan!', null);
    }

    public function show($id)
    {
        $category = Category::with('group')->whereId($id)->first();
        
        if($category) {
            //return success with Api Resource
            return new CategoryResource(true, 'Detail Data Category!', $category);
        }

        //return failed with Api Resource
        return new CategoryResource(false, 'Detail Data Category Tidak DItemukan!', null);
    }

    public function update(Request $request, Category $category)
    {
        $validator = Validator::make($request->all(), [
            'name'          => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

       
        //update status without password
        $category->update([
            'name'          => $request->name,
            'description'   => $request->desc,
            'group_id'      => $request->group_id,
            'updated_by'    => Auth::user()->id,
           
        ]);



        if($category) {
            //return success with Api Resource
            return new CategoryResource(true, 'Data Category Berhasil Diupdate!', $category);
        }

        //return failed with Api Resource
        return new CategoryResource(false, 'Data Category Gagal Diupdate!', null);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
