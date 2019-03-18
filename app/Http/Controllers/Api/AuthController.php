<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\User;

class AuthController extends Controller
{
    /**
    * Create a new AuthController instance.
    *
    * @return void
    */

    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login']]);
    }

    public function login(LoginRequest $request)
    {
        $credentials = $request->only('email', 'password');
        if (!$token = auth('api')->attempt($credentials)) {
            return response()->json([
                'status' => 'error',
                'error' => 'invalid.credentials',
                'msg' => 'Credenciales Inválidas.'
            ], 401);
        }
        return response()->json([
                'access_token' => $token
            ]);
    }

    public function logout() {
        try {
            auth('api')->logout();
            return response()->json([
                'status' => 'success',
                'message' => 'Cerró Sesión.'
            ]);
        } catch (JWTException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Falló el cierre de sesión.'
            ], 401);
        }
    }

    public function guard(){
        return \Auth::Guard('api');
    }
}
