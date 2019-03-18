<?php

namespace App\Models;

use App\User;
use Illuminate\Database\Eloquent\Model;

class Rol extends Model
{
    protected $table = 'roles';

    protected $fillable = [];

    protected $dates = [
        'deleted_at'
    ];

    function users ()
    {
        return $this->hasMany(User::class);
    }
}
