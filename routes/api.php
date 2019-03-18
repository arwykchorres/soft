<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('login', 'Api\AuthController@login');

Route::group(['prefix' => 'auth', 'middleware' => 'jwt.auth'], function () {
  Route::post('logout', 'Api\AuthController@logout');
});

Route::group([
    'prefix'    => 'admin',
    'namespace' => 'Api',
    'as'        => 'api.admin.',
    'middleware' => 'jwt.auth'
  ],
  function(){
    Route::resource('users', 'UserController', ['only' => ['store','update','destroy']]);
    Route::get('roles/list', 'RolController@listRoles')->name('rol.list');
    Route::resource('roles', 'RolController', ['only' => ['index','store','update','destroy']]);
  }
);

Route::group([
  'prefix'    => 'datatables',
  'namespace' => 'DataTables',
  'as'        => 'api.admin.',
  'middleware' => 'jwt.auth'
  ],
  function(){
    //DataTables
    Route::get('users', 'UserController@getDataTable')->name('users.datatables');
  }
);