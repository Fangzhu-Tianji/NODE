import Vue from 'vue'
import Router from 'vue-router'
import One from '@/views/one/One'
import Two from '@/views/two/Two'
import Three from '@/views/three/Three'
import oneContent from '@/views/one-content/oneContent'
import twoContent from '@/views/two-content/twoContent'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/one'
    },
    {
      path: '/one/oneContent',
      component: oneContent
    },
    {
      path: '/one',
      component: One
    },
    {
      path: '/two',
      component: Two,
      children: [
        {
          path: 'twoContent',
          component: twoContent
        }
      ]
    },
    {
      path: '/three',
      component: Three
    }
  ]
})
