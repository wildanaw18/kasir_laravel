<?php

namespace App\Models\Master;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Shop extends Model
{
    use HasFactory;
    protected $fillable = ['shop_name','header_inv','address','phone','image','owner_name','user_id','created_by','updated_by'];


    public function user() {
       return $this->belongsTo(User::class);
    }
    public function status() {
        return $this->belongsTo(Status::class);
     }
    protected function image(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => asset('/storage/shops/' . $value),
        );
    }
}
