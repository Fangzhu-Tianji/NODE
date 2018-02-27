import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import CanShu from '@/components/canshu'
import Hi from '@/components/hi'
import Error from '@/components/error'
import Hanger from '@/components/hanger'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/canshu/:newsId(\\d+)/:newsTitle',//括号里面的内容是正则，必须输入数字
      component: CanShu
    },
    {
      path: '/gohome',
      redirect: '/'
    },
    {
      path: '/gocanshu/:newsId/:newsTitle',
      redirect: '/canshu/:newsId/:newsTitle'
    },
    {
      path: '/',
      component: Hi,
      alias: '/zch'
    },
    {
      path: '*',
      component: Error
    },
    {
      path: '/hanger/:newsId/:newsTitle',
      component: Hanger,
      beforeEnter: (to, form, next) => {
        console.log(to);
        console.log(form);
        next();
        // next(true);
        // next({
        //   path: '/'
        // });
      }
    }
  ],
  mode: 'history'
})
