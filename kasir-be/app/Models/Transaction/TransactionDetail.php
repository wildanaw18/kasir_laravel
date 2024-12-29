<?php

namespace App\Models\Transaction;

use App\Models\Product\Product;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransactionDetail extends Model
{
    use HasFactory;
    protected $guarded = [""];
    public function product() {
        return $this->belongsTo(Product::class, 'product_id');
     }
}
