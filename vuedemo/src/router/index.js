import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import content from '@/components/content/content.vue'
import ssq from '@/components/ssq/ssq.vue'
import sszx from '@/components/sszx/sszx.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }, {
      path: '/content',
      name: 'content',
      component: content
    }, {
      path: '/ssq',
      name: 'ssq',
      component: ssq
    }, {
      path:'/sszx',
      name:'sszx',
      component:sszx
    }
  ]
})
