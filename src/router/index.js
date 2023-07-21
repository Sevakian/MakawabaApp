import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/Timestats',
    name: 'Timestats',
    component: () => import('../views/Timestats.vue')
  },
  {
    path: '/Calendar',
    name: 'Calendar',
    component: () => import('../views/Calendar.vue')
  },
  {
    path: '/Gaming',
    name: 'Gaming',
    component: () => import('../views/Gaming.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router
