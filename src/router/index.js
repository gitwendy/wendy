import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',

    component: () => import('../views/About.vue')
  },
  {
    path: '/classIty',
    name: 'classIty',

    component: () => import('../views/classIty.vue')
  },
  {
    path: '/shopCart',
    name: 'shopCart',

    component: () => import('../views/shopCart.vue')
  },
  {
    path: '/mine',
    name: 'mine',

    component: () => import('../views/mine.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
