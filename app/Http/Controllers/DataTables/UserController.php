<?php

namespace App\Http\Controllers\DataTables;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\DataTables\Users;

class UserController extends Controller
{
	private $repositorio;

    public function __construct(Users $repositorio)
    {
        $this->repositorio = $repositorio;
    }
	
    public function getDataTable()
    {
        return $this->repositorio->getDataFromDataTable();
    }
}
