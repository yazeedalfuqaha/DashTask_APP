import { defineRouter } from '#q-app/wrappers'
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router'
import routes from './routes'
import { useAuthStore } from 'src/stores/auth'
import { watch } from 'vue'

export default defineRouter(function ({ store }) {

  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE),
  })

  Router.beforeEach(async (to) => {
    const auth = useAuthStore(store)


    if (!auth.initialized) {
      await new Promise<void>((resolve) => {
        const unwatch = watch(() => auth.initialized, (val) => {
          if (val) {
            resolve()
            unwatch()
          }
        })
      })
    }


    if ((to.path === '/login' || to.path === '/signup') && auth.user) {
      return '/dashboard'
    }

    
    if (to.meta.requiresAuth && !auth.user) {
      return '/login'
    }

  })

  return Router
})
