<?php

use Illuminate\Support\Facades\Route;
use App\Mail\SendEmail;
use Illuminate\Support\Facades\Mail;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/send-email',function(){
    $data = [
        'name' => 'Syahrizal As',
        'body' => 'Testing Kirim email'
    ];
    
    Mail::to('mulya.wardhana@pcpexpress.com')->send(new SendEmail($data));
   
    dd("Email Berhasil dikirim.");
});