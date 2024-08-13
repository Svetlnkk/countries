import { createRouter, createWebHistory } from 'vue-router'

import CountriesRouter from '../modules/country/country.routes'

const routes = [
  ...CountriesRouter,

  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/login',
    name: 'login',
    meta: { title: 'Авторизация' },
    component: () => import('../modules/login/view/LoginView.vue')
  },

  {
    path: '/forbidden',
    name: 'forbidden',
    meta: { layout: 'empty' },
    component: () => import('../views/ForbiddenView.vue')
  },
  {
    path: '/not_found',
    name: 'not_found',
    meta: { layout: 'empty' },
    component: () => import('../views/NotFoundView.vue')
  },
  {
    path: '/:catchAll(.*)',
    name: 'Not Found Another',
    redirect: '/not_found'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to) => {
  try {
    document.title = String(to.meta.title || 'Страны')

    if (!to.matched.length) {
      return { name: 'not_found' }
    }

    if (to.name === 'login') return

    if (localStorage.getItem('login')) return

    const isServiceUrl = to.name === 'forbidden' || to.name === 'not_found'
    if (!isServiceUrl) sessionStorage.setItem('req-path', to.fullPath)

    return { name: 'login' }
  } catch {
    //
  }
})

export default router
