<?php

use Illuminate\Support\Facades\Route;


//route login
Route::post('/login', [App\Http\Controllers\Api\Auth\LoginController::class, 'index']);

//group route with middleware "auth"
Route::group(['middleware' => 'auth:api'], function() {

    //logout
    Route::post('/logout', [App\Http\Controllers\Api\Auth\LoginController::class, 'logout']);
});
    //group route with prefix "admin"
Route::prefix('admin')->group(function () {
      //group route with middleware "auth:api"

      Route::group(['middleware' => 'auth:api'], function () {
        //dashboard
    
        Route::get('/dashboard', App\Http\Controllers\Api\Admin\DashboardController::class);
        Route::get('/dashboard/bar-chart', [App\Http\Controllers\Api\Admin\DashboardController::class, 'barChart']);
        Route::get('/product-stock-minus', [\App\Http\Controllers\Api\Admin\DashboardController::class, 'indexStockMinus']);
        Route::get('/product-best-seller', [\App\Http\Controllers\Api\Admin\DashboardController::class, 'bestSeller']);
        Route::get('/permissions', [\App\Http\Controllers\Api\Admin\Master\PermissionController::class, 'index'])
        ->middleware('permission:permissions.index');

        //permissions all
        Route::get('/permissions/all', [\App\Http\Controllers\Api\Admin\Master\PermissionController::class, 'all'])
        ->middleware('permission:permissions.index');
        //roles all
        Route::get('/roles/all', [\App\Http\Controllers\Api\Admin\Master\RoleController::class, 'all'])
        ->middleware('permission:roles.index');

   
        //roles
        Route::apiResource('/roles', App\Http\Controllers\Api\Admin\Master\RoleController::class)
        ->middleware('permission:roles.index|roles.store|roles.update|roles.delete');

        //users all
        Route::apiResource('/users', App\Http\Controllers\Api\Admin\Master\UserController::class)
        ->middleware('permission:users.index|users.store|users.update|users.delete');
        Route::get('/masters', [\App\Http\Controllers\Api\Admin\Master\MasterController::class, 'index']);
      
        Route::apiResource('/status', App\Http\Controllers\Api\Admin\Master\StatusController::class)
        ->middleware('permission:status.index|status.store|status.update|status.delete');

        Route::apiResource('/groups', App\Http\Controllers\Api\Admin\Master\GroupController::class)
        ->middleware('permission:groups.index|groups.store|groups.update|groups.delete');
        Route::apiResource('/shops', App\Http\Controllers\Api\Admin\Master\ShopController::class)
        ->middleware('permission:shops.index|shops.store|shops.update|shops.delete');
        Route::apiResource('/branchs', App\Http\Controllers\Api\Admin\Master\BranchController::class)
        ->middleware('permission:branchs.index|branchs.store|branchs.update|branchs.delete');
        Route::apiResource('/categories', App\Http\Controllers\Api\Admin\Master\CategoryController::class)
        ->middleware('permission:categories.index|categories.store|categories.update|categories.delete');
        Route::apiResource('/sizes', App\Http\Controllers\Api\Admin\Master\SizeController::class)
        ->middleware('permission:sizes.index|sizes.store|sizes.update|sizes.delete');
        Route::apiResource('/units', App\Http\Controllers\Api\Admin\Master\UnitController::class)
        ->middleware('permission:units.index|units.store|units.update|units.delete');
        Route::apiResource('/customers', App\Http\Controllers\Api\Admin\Master\CustomerController::class)
        ->middleware('permission:customers.index|customers.store|customers.update|customers.delete');
        Route::apiResource('/suppliers', App\Http\Controllers\Api\Admin\Master\SupplierController::class)
        ->middleware('permission:suppliers.index|suppliers.store|suppliers.update|suppliers.delete');
        Route::apiResource('/products', App\Http\Controllers\Api\Admin\Master\ProductController::class)
        ->middleware('permission:products.index|products.store|products.update|products.delete');
        Route::get('/carts', [\App\Http\Controllers\Api\Admin\Transaction\CartController::class, 'index']);
        Route::delete('/carts/{id}', [\App\Http\Controllers\Api\Admin\Transaction\CartController::class, 'destroy']);
        Route::get('/cart-sums', [\App\Http\Controllers\Api\Admin\Transaction\CartController::class, 'cart_sum']);
        Route::post('/carts', [\App\Http\Controllers\Api\Admin\Transaction\CartController::class, 'store']);
        Route::get('/transaction-orders', [\App\Http\Controllers\Api\Admin\Transaction\TransactionController::class, 'index'])
        ->middleware('permission:today-orders.index');
        Route::post('/transactions', [\App\Http\Controllers\Api\Admin\Transaction\TransactionController::class, 'store']);
        Route::get('/transaction-print/{id}', [\App\Http\Controllers\Api\Admin\Transaction\TransactionController::class, 'print']);
        Route::get('/transaction-print-detail/{id}', [\App\Http\Controllers\Api\Admin\Transaction\TransactionController::class, 'printDetail']);
        Route::apiResource('/expenses', \App\Http\Controllers\Api\Admin\Transaction\ExpenseController::class)
        ->middleware('permission:expenses.index|expenses.store|expenses.update|expenses.delete');
        Route::get('/report-expenses', [\App\Http\Controllers\Api\Admin\Report\ReportController::class, 'index'])
        ->middleware('permission:report-expenses.index');
        Route::get('/report-orders', [\App\Http\Controllers\Api\Admin\Report\ReportController::class, 'indexOrder'])
        ->middleware('permission:report-orders.index');
      
    });
});


