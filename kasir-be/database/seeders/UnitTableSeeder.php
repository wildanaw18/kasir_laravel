<?php

namespace Database\Seeders;

use App\Models\Master\Unit;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UnitTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Unit::create([
            'unit_name' => 'Kg',
        ]);
    }
}
