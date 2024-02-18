import Vue from 'vue'
import VueRouter from 'vue-router'
import Loginpg from '../views/loginpg.vue'


Vue.use(VueRouter)


const routes = [
    {
      path: '/',
      name: 'Login',
      component:Loginpg,
      meta:{
        title:"base page"
      },
    },
    {
      path: '/main/',
      name: 'Mainpg',
      component: () => import( '../views/mainpg.vue')
    },
    {
      path: '/video/',
      name: 'Videopg',
      component: () => import( '../views/videopg.vue')
    },
    {
      path: '/setting/',
      name: 'Setting',
      component: () => import( '../views/settingpg.vue')
    },

  ]
  
  
  
  const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
  })
  
  export default router
