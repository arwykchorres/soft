<?php

use Illuminate\Database\Seeder;
use App\Models\Rol;

class RolsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Rol::create(['name' => 'Admin', 'display_name' => 'Administrador']);
        Rol::create(['name' => 'User', 'display_name' => 'Usuario']);
        Rol::create(['name' => 'Vendedor', 'display_name' => 'Vendedor']);
    }
}
