import Vue from 'vue'
import VueRouter from 'vue-router'
import { PcCookie, Key } from '@/utils/cookie'

import layout from '../components/index'

import baseComponent from '../layout/baseComponent'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/auth'
  },
  {
    path: '/auth',
    name: 'Login',
    component: () => import('@/components/Login')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/components/Register')
  },
  {
    path: '/index',
    name: 'Index',
    redirect: '/welcome',
    component: () => import('@/components/index')
  },
  // 系统管理
  {
    path: '/system',
    component: layout,
    redirect: '/system/user',
    children: [
      {
        path: 'user',
        component: () => import('@/views/system/user/user')
      },
      {
        path: 'role',
        component: () => import('@/views/system/role/role')
      },
      {
        path: 'menu',
        name: 'Menu',
        component: () => import('@/views/system/menu/menu')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

/**
 * 挂在路由导航守卫
 * to 将要访问的路径
 * from 代表从哪个路径跳转而来
 * next 放行 next() next('/login')
 */
router.beforeEach((to, from, next) => {
  if (to.path === '/auth') return next()
  const userInfo = PcCookie.get(Key.userInfoKey) ? JSON.parse(PcCookie.get(Key.userInfoKey)) : null
  if (!userInfo) return next('/auth')
  next()
})

export default router
