<?php

namespace App\Http\Controllers\Api;

use App\User;
use Illuminate\Http\Request;
use App\Http\Requests\UserRequest;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    private $user;
    private $request;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //if(!$request->ajax()) return redirect('/');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\UserRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(UserRequest $request)
    {
        $this->request = $request->validated();
        
        $this->request['foto_url'] = $this->saveImgUser(request()->file('foto_url'));
        $user = User::create( $this->request );
        /*$user = User::create([
            'nombre_completo' => $this->request->nombre_completo ,
            'email' =>  $this->request->email ,
            'password' => $this->request->password,
            'foto_url' => saveImgUser(),//Storage::url($pathPhoto),
            'rol_id' => $this->request->rol_id
        ]);*/

        return "Usuario Creado.";
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UserRequest  $request
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(UserRequest $request, User $user)
    {
        $this->user = $user;

        //se obtiene el request validado
        $this->request = $request->validated();

        //Se verifica si la url de la foto es diferente a la que tiene el usuario. Si lo es, se guarda la nueva foto, sino se devuelve la rul
        $this->request['foto_url']= $this->request['foto_url'] != $this->user->foto_url ?
                                    $this->saveImgUser(request()->file('foto_url'), true , $this->user) : 
                                    $this->request['foto_url'];

        $this->user->update( $this->request );
        
        return "Usuario Actualizado.";
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $user->delete();

        return "Usuario Eliminado.";
    }

    public function saveImgUser($photo, $deleteImg = false, $user = null)
    {
        $deleteImg === true? $this->deleteImgUSer($user->foto_url) : '';
        $pathPhoto = $photo->store('public/img/user');
        return Storage::url($pathPhoto);
    }

    public function deleteImgUSer($photoPath)
    {
        //Se modifica la URL, debido Storage busca la photo dentro de storage/app/storage, pero esta url
        //no existe, la correcta es storage/app/plubic
        $photoPath = str_replace('storage', 'public', $photoPath);
        Storage::delete($photoPath);
    }
}
