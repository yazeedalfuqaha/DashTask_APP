import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'), // 🌟 Layout رئيسي
    children: [
      { path: '', redirect: '/login' },
      { path: 'login', component: () => import('pages/LoginPage.vue') },
      { path: '/about-app', component: () => import('pages/AboutPage.vue') },
      { path: 'signup', component: () => import('pages/SignupPage.vue') },
      { path: 'dashboard', component: () => import('pages/DashboardPage.vue'), meta: { requiresAuth: true } },
      { path: ':catchAll(.*)*', redirect: '/login' },

    ]
  }
]

export default routes
