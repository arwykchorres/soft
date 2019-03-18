const apiClient = axios.create({
    //baseURL: 'http://macasoft.test/',
    headers: {
        Accept : 'aplication/json',
        'Content-Type' : 'aplication/json'
    }
})

export default {
    login(credentials){
        return apiClient.post('/api/login', credentials);
    },
    logout(){
        //la ruta es post, en vez de put porque se envia un FormData con la img 
        return apiClient.post('/api/auth/logout');
    }
}