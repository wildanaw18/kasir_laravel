<?php

namespace App\Models\Product;

use App\Models\Master\Category;
use App\Models\Master\Size;
use App\Models\Master\Unit;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Product extends Model
{
    use HasFactory;
    protected $guarded =[""];

    public function size() {
        return $this->belongsTo(Size::class);
     }
     public function category() {
        return $this->belongsTo(Category::class);
     }
     public function unit() {
        return $this->belongsTo(Unit::class);
     }
     public function user() {
        return $this->belongsTo(User::class);
     }
    protected function image(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => asset('/storage/products/' . $value),
        );
    }
}
