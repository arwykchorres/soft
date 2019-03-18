<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        switch ($this->method()) {
            case 'GET':{}
            case 'DELETE':
            {
                return [
                    'id' => 'required'
                ];
            }
            case 'POST':
            {
                $rules = [
                    'nombre_completo' => 'required|min:3',
                    'foto_url' => 'required|image',
                    'rol_id' => 'required|not_in:0',
                    'email' => 'required|email|min:6|max:120|unique:users,email',
                    'password' => 'required|min:6|max:30'
                ];
                return $rules;
            }
            case 'PUT':
            case 'PATCH':
            {
                $rules = [
                    'nombre_completo' => 'required',
                    'email' => 'required|email|min:6|max:120|unique:users,email,'.$this->user->id,
                    'foto_url' => 'required',
                    'rol_id' => 'required|not_in:0',
                ];
                if ($this->filled('password')) {
                    $rules['password'] = ['min:3', 'max:30'];
                }
                return $rules;
            }
            default:break;
        }
    }
}
