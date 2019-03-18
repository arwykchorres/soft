const apiClient = axios.create({
    //baseURL: 'http://macasoft.test/',
    headers: {
        Accept : 'aplication/json',
        'Content-Type' : 'aplication/json'
    }
})

export default {
    getUsers(){
        return apiClient.get('/api/datatables/users');
    },
    store(user){
        return apiClient.post('/api/admin/users', user);
    },
    update(id, user){
        //la ruta es post, en vez de put porque se envia un FormData
        return apiClient.post('/api/admin/users/'+ id, user);
    },
    delete(id){
        return apiClient.delete('/api/admin/users/' + id);
    },
    getListSelectRoles(){
        return apiClient.get('/api/admin/roles/list');
    }

}
