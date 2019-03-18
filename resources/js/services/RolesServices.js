const apiClient = axios.create({
    //baseURL: 'http://macasoft.test/',
    headers: {
        Accept : 'aplication/json',
        'Content-Type' : 'aplication/json'
    }
})

export default {
    getRoles(){
        return apiClient.get('/api/admin/roles');
    },
    store(rol){
        return apiClient.post('/api/admin/roles', rol);
    },
    update(rol){
        //la ruta es post, en vez de put porque se envia un FormData con la img 
        return apiClient.put('/api/admin/roles/'+ rol.id, rol);
    },
    delete(id){
        return apiClient.delete('/api/admin/roles/' + id);
    }

}