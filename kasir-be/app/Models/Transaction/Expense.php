<?php

namespace App\Models\Transaction;

use App\Models\Master\Category;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Expense extends Model
{
    use HasFactory;
    protected $guarded =[""];
    public function category() {
        return $this->belongsTo(Category::class);
     }
}
