
const DefaultContainer = () => import('../containers/DefaultContainer')
const Login = () => import('../views/auth/login')
const Usuarios = () => import('../views/dashboard/usuarios/index')
const Roles = () => import('../views/dashboard/roles/index')

export const routes = [
    {
        path    : '/', 
        name    : 'Home',
        redirect: { name : 'Login'},
        component: {
            render (c){ return c('router-view')}
        }
    },
    {
        path    : '/login',
        name    : 'Login',
        component: Login
    },
    {
        path    : '/dashboard', 
        name    : 'Dashboard',
        component: DefaultContainer,
        meta: { requiresAuth: true },
        children: [
            {
                path    : 'configuracion',
                redirect: { name : 'Usuarios'},
                component:{
                    render (c){ return c('router-view')}
                },
                children:[
                    {
                        path     : 'usuarios',
                        name     : 'Usuarios',
                        component: Usuarios
                    },
                    {
                        path     : 'roles',
                        name     : 'Roles',
                        component: Roles
                    }
                ]
            }
        ]
    },
    {
        path: '*',
        component:{
            render (c){ return c('router-view')}
        }
    }
];

//export const routes;