<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionUpdateTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        //permission for other-charge
        Permission::create(['name' => 'other-charges.index', 'guard_name' => 'api']);
        Permission::create(['name' => 'other-charges.create', 'guard_name' => 'api']);
        Permission::create(['name' => 'other-charges.edit', 'guard_name' => 'api']);
        Permission::create(['name' => 'other-charges.delete', 'guard_name' => 'api']);
          
        //permission for commodity
        Permission::create(['name' => 'commodities.index', 'guard_name' => 'api']);
        Permission::create(['name' => 'commodities.create', 'guard_name' => 'api']);
        Permission::create(['name' => 'commodities.edit', 'guard_name' => 'api']);
        Permission::create(['name' => 'commodities.delete', 'guard_name' => 'api']);
        //permission for goods
        Permission::create(['name' => 'goods.index', 'guard_name' => 'api']);
        Permission::create(['name' => 'goods.create', 'guard_name' => 'api']);
        Permission::create(['name' => 'goods.edit', 'guard_name' => 'api']);
        Permission::create(['name' => 'goods.delete', 'guard_name' => 'api']);

        Permission::create(['name' => 'booking-details.update', 'guard_name' => 'api']);
        Permission::create(['name' => 'booking-details.delete', 'guard_name' => 'api']);
        Permission::create(['name' => 'report.index', 'guard_name' => 'api']);

    }
}
