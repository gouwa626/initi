import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import index from '@/components/index.vue'
import content from '@/components/content.vue'
import ssq from '@/components/ssq.vue'
import sszx from '@/components/sszx.vue'

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
      path: '/index',
      name: 'index',
      component: index
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
