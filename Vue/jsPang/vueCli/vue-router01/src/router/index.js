import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Hi from '@/components/hi'
import Hi1 from '@/components/hi1'
import Hi2 from '@/components/hi2'

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
      name: 'hi',
      component: Hi,
      children: [
        {
          path: 'hi1',
          name: '/hi/hi1',
          component: Hi1
        },
        {
          path: 'hi2',
          name: '/hi/hi2',
          component: Hi2
        }
      ]
    }
  ]
})
