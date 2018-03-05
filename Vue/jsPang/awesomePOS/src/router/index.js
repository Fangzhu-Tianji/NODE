import Vue from 'vue'
import Router from 'vue-router'
import Pos from '@/components/page/Pos'
import Shop from '@/components/page/shop'
import Goods from '@/components/page/goods'
import Member from '@/components/page/member'
import Count from '@/components/page/count'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Pos',
      component: Pos
    },
    {
      path: '/page/shop',
      name: 'shop',
      component: Shop
    },
    {
      path: '/page/goods',
      name: 'goods',
      component: Goods
    },
    {
      path: '/page/member',
      name: 'member',
      component: Member
    },
    {
      path: '/page/count',
      name: 'count',
      component: Count
    }
  ]
})
