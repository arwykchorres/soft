//import {getLoggedinUser} from './helpers/auth';

//const user = getLoggedinUser();

export default {
    state: {
        authenticatedUser: false,
    },
    getters: {
        authenticatedUser(state){
            return state.authenticatedUser;
        },
    },
    mutations: {
        loginSuccess(state, payload){
            state.authenticatedUser = true;
            localStorage.setItem("api_token", payload.access_token);
        },
        logout(state){
            state.authenticatedUser = false;
            localStorage.removeItem("api_token");
        }
    },
};