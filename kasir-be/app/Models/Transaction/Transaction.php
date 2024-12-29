<?php

namespace App\Models\Transaction;

use App\Models\Master\Customer;
use App\Models\Master\Shop;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Carbon\Carbon;

class Transaction extends Model
{
    use HasFactory;
    protected $guarded = [""];
    public function transaction_detail() {
        return $this->belongsTo(TransactionDetail::class);
     }
     public function user() {
        return $this->belongsTo(User::class);
     }
     public function customer() {
        return $this->belongsTo(Customer::class);
     }
     public function shop() {
        return $this->belongsTo(Shop::class);
     }

     protected function createdAt(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => Carbon::parse($value)->format('d-M-Y H:i:s'),
        );
    }
}
