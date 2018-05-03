import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'

Vue.use(Router)
Vue.use(Meta, {
  ssrAttribute: 'data-vue-meta-server-rendered'  
})

// route-level code splitting
const GenericNonprofit = () => import('../views/GenericNonprofit.vue')

export function createRouter () {
  return new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      {
        path: '/nonprofits/:ein',
        name: 'GenericNonprofit',
        component: GenericNonprofit
      }
    ]
  })
}
