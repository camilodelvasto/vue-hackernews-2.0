import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

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
        name: 'Nonprofits',
        component: GenericNonprofit
      }
    ]
  })
}
