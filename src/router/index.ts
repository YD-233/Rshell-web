// 绑定路由和vue
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import {cancelRequest} from "@/utils/request";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [

        {
          path: '/Clients',
          name: 'Clients',
          meta: {
            title: '客户端列表'
          },
          component: () => import('@/views/clients/ClientsView.vue')
        },
        {
          path: '/Listeners',
          name: 'Listeners',
          meta: {
            title: 'Listener列表'
          },
          component: () => import('@/views/listener/listener.vue')
        },
        {
          path: '/Server',
          name: 'Server',
          meta: {
            title: '客户端生成'
          },
          component: () => import('@/views/server/ServerGen.vue')
        },
        {
          path: '/WebDelivery',
          name: 'WebDelivery',
          meta: {
            title: 'WebDelivery',

          },
          component: () => import('@/views/server/WebDelivery.vue')
        },

        {
          path: '/user/resetpassword',
          name: 'resetpassword',
          meta: {
            title: '重置密码',

          },
          component: () => import('@/views/user/ResetPassword.vue')
        },
      ]
    },
    {
      path: '/client',
      name: '客户端详情',
      meta: {
        title: '客户端详情',

      },
      component: () => import('@/views/client/ClientView.vue'),
      children: [
        {
          path: '/client/shell',
          name: 'Shell',
          meta: {
            title: 'Shell',

          },
          component: () => import('@/views/client/View/ClientShell.vue')
        },
        {
          path: '/client/files',
          name: 'Files',
          meta: {
            title: 'Files'
          },
          component: () => import('@/views/client/View/ClientFiles.vue')
        },
        {
          path: '/client/pid',
          name: 'PID',
          meta: {
            title: 'PID'
          },
          component: () => import('@/views/client/View/ClientPid.vue')
        },
        {
          path: '/client/downloads',
          name: 'Downloads',
          meta: {
            title: 'Downloads'
          },
          component: () => import('@/views/client/View/ClientDownloads.vue')
        },
        {
          path: '/client/notes',
          name: 'Notes',
          meta: {
            title: 'Notes'
          },
          component: () => import('@/views/client/View/ClientNotes.vue')
        }
      ]
    },
    {
      path: '/login',
      name: '登陆',
      meta: {
        title: '登陆'
      },
      component: () => import('@/views/login/LoginView.vue')
    },
    {
      path: '/404',
      name: '404',
      meta: {
        title: '404'
      },
      component: () => import('@/views/error/404View.vue')
    },
    {
      path: '/401',
      name: '401',
      meta: {
        title: '401'
      },
      component: () => import('@/views/error/401View.vue')
    },
  ]
})

export default router
