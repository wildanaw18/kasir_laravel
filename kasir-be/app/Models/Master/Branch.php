<?php

namespace App\Models\Master;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Branch extends Model
{
    use HasFactory;
    protected $fillable = ['branch_name','address','branch_code','shop_id','created_by','updated_by','city_id'];

    public function city()
    {
        return $this->belongsTo(City::class);
    }
}
