<?php

namespace App\DataTables;

use Illuminate\Support\Facades\DB;
use Yajra\DataTables\Facades\DataTables;
use App\User;

class Users
{
    public function getDataFromDataTable()
    {
        $models = User::with('rol');

        return DataTables::eloquent($models)
				->toJson();
    }
}