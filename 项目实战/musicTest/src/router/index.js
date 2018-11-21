import Vue from 'vue'
import Router from 'vue-router'
import One from '@/views/one/One'
import Two from '@/views/two/Two'
import Three from '@/views/three/Three'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/one'
    },
    {
      path: '/one',
      component: One
    },
    {
      path: '/two',
      component: Two
    },
    {
      path: '/three',
      component: Three
    },
  ]
})
