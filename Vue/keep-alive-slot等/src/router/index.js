import Vue from 'vue'
import Router from 'vue-router'
import One from '@/components/One'
import Two from '@/components/Two'
import Three from '@/components/Three'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/one'
    },
    {
      path: '/one',
      name: 'One',
      component: One,
      meta: {
        // 是否需要缓存数据
        keepAlive: true
      }
    },
    {
      path: '/two',
      component: Two,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/three',
      component: Three,
      meta: {
        keepAlive: false
      }
    }
  ]
})
