<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RolRequest extends FormRequest
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
                    'name' => 'required|min:3|unique:roles,name',
                    'display_name' => 'required|min:3',
                ];
                return $rules;
            }
            case 'PUT':
            case 'PATCH':
            {
                $rules = [
                    'name' => 'required|min:3|unique:users,name,'.$this->rol->id,
                    'display_name' => 'required|min:3',
                ];
                return $rules;
            }
            default:break;
        }
    }
}
