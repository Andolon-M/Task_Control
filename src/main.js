import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router';
import Home from './Home.vue';
import Login from './Login.vue'
import Products from './views/Products.vue';
import CreateUser from './CreateUser.vue';
import Start from './views/Start.vue';
const routes = [
    { path: '/', name: 'Start', component: Start},
    { path: '/home', component: Home },
    { path: '/login', name: 'Login', component: Login },
    { path: '/register', name: 'Register', component: CreateUser },
    { path: '/products', name: 'Products', component: Products, meta: { requiresAuth: true } }
]

// crear objeto de rutas de vue router -- objeto de vr
const router = createRouter({
    history: createWebHistory(),
    routes
});
// Guardia global para verificar cookies
router.beforeEach(async (to, from, next) => {
    // Si la ruta requiere autenticación
    if (to.matched.some(record => record.meta.requiresAuth)) {

        const res = await fetch('/api/users/vefiryToken')

        const tokenvalid = await res.json()
        console.log('soy tu tocken',tokenvalid);
        

        if (!tokenvalid?.token)  next({ name: 'Login' });

        next();

    } else {    
        next(); // Si no requiere autenticación, sigue normalmente
    }
});
//instancia de vue
const app = createApp(App)

// use router
app.use(router)

// mount #app
app.mount('#app')

