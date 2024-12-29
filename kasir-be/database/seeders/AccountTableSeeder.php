<?php

namespace Database\Seeders;

use App\Models\Master\Account;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AccountTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Account::create([
            'name' => 'Kas Pengeluaran',
            'account_code' => '1-0001'
        ]);
    }
}
