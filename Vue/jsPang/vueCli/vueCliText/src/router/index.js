import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import hi from '@/components/hi'
import hi1 from '@/components/hi1'
import hi2 from '@/components/hi2'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/hi',
      component: hi,
      children: [
        {
          path: '/',
          name: 'hellow/hi',
          component: hi
        },
        {
          path: 'hi1',
          name: 'hellow/hi/hi1',
          component: hi1
        },
        {
          path: 'hi2',
          name: 'hellow/hi/hi2',
          component: hi2
        }
      ]
    }
  ]
})
