<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class PermissionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
          //permission for transaction
          Permission::create(['name' => 'bookings.index', 'guard_name' => 'api']);
          Permission::create(['name' => 'bookings.create', 'guard_name' => 'api']);
          Permission::create(['name' => 'bookings.edit', 'guard_name' => 'api']);
          Permission::create(['name' => 'bookings.delete', 'guard_name' => 'api']);
        

        //permission for transaction
        Permission::create(['name' => 'transactions.index', 'guard_name' => 'api']);
        Permission::create(['name' => 'transactions.create', 'guard_name' => 'api']);
        Permission::create(['name' => 'transactions.edit', 'guard_name' => 'api']);
        Permission::create(['name' => 'transactions.delete', 'guard_name' => 'api']);

        //permission for transaction details
        Permission::create(['name' => 'transaction_details.index', 'guard_name' => 'api']);

        //permission for branch
        Permission::create(['name' => 'branches.index', 'guard_name' => 'api']);
        Permission::create(['name' => 'branches.create', 'guard_name' => 'api']);
        Permission::create(['name' => 'branches.edit', 'guard_name' => 'api']);
        Permission::create(['name' => 'branches.delete', 'guard_name' => 'api']);

        //permission for sliders
        Permission::create(['name' => 'iatas.index', 'guard_name' => 'api']);
        Permission::create(['name' => 'iatas.create', 'guard_name' => 'api']);
        Permission::create(['name' => 'iatas.delete', 'guard_name' => 'api']);

        //permission for roles
        Permission::create(['name' => 'roles.index', 'guard_name' => 'api']);
        Permission::create(['name' => 'roles.create', 'guard_name' => 'api']);
        Permission::create(['name' => 'roles.edit', 'guard_name' => 'api']);
        Permission::create(['name' => 'roles.delete', 'guard_name' => 'api']);

        //permission for permissions
        Permission::create(['name' => 'permissions.index', 'guard_name' => 'api']);

        //permission for users
        Permission::create(['name' => 'users.index', 'guard_name' => 'api']);
        Permission::create(['name' => 'users.create', 'guard_name' => 'api']);
        Permission::create(['name' => 'users.edit', 'guard_name' => 'api']);
        Permission::create(['name' => 'users.delete', 'guard_name' => 'api']);

        //permission for products
        Permission::create(['name' => 'statuses.index', 'guard_name' => 'api']);
        Permission::create(['name' => 'statuses.create', 'guard_name' => 'api']);
        Permission::create(['name' => 'statuses.edit', 'guard_name' => 'api']);
        Permission::create(['name' => 'statuses.delete', 'guard_name' => 'api']);

        //permission for pages
        Permission::create(['name' => 'countries.index', 'guard_name' => 'api']);
        Permission::create(['name' => 'countries.create', 'guard_name' => 'api']);
        Permission::create(['name' => 'countries.edit', 'guard_name' => 'api']);
        Permission::create(['name' => 'countries.delete', 'guard_name' => 'api']);

        //permission for photos
        Permission::create(['name' => 'customers.index', 'guard_name' => 'api']);
        Permission::create(['name' => 'customers.create', 'guard_name' => 'api']);
        Permission::create(['name' => 'customers.delete', 'guard_name' => 'api']);
    }
}