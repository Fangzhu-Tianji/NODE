import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Hi1 from '@/components/hi1'
import Hi2 from '@/components/hi2'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      components: {
        default: HelloWorld,
        left: Hi1,
        right: Hi2
      }
    },
    {
      path: '/hi',
      components: {
        default: HelloWorld,
        left: Hi2,
        right: Hi1
      }
    }
  ]
})
