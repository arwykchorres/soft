
window.Vue = require('vue');

import Vuetify from 'vuetify'

import 'vuetify/dist/vuetify.min.css'

import VueRouter from 'vue-router'

import Vuex from 'vuex'

import axios from 'axios'

import storeData from './store.js';

Vue.use(VueRouter)
Vue.use(Vuetify,{
  theme: {
    primary: '#4285f4', //#1565C0 #2196f3
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#33b5e5',  //'#2196F3',
    success: '#4CAF50',
    warning: '#fb3',
  },
  customProperties: true,
  iconfont: 'md'
})

Vue.use(Vuex)

import { routes } from './router';

const router = new VueRouter({
  routes ,// forma corta para routes: routes
  mode: 'history',
  //scrollBehavior (to, from, savedPosition) {
    scrollBehavior () {
     return { y: 0 }
    }/*,
  linkExactActiveClass: "link-exact-active",
  linkActiveClass: "link-active"*/
})

const store = new Vuex.Store(storeData);

const app = new Vue({
  //el: '#app',
  router,
  store
//})
}).$mount('#app')

