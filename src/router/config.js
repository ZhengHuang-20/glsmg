import TabsView from '@/layouts/tabs/TabsView'
import BlankView from '@/layouts/BlankView'

// 路由配置
const options = {
  routes: [
    {
      path: '/login',
      name: '登录页',
      component: () => import('@/views/login')
    },
    {
      path: '*',
      name: '404',
      component: () => import('@/views/exception/404'),
    },
    {
      path: '/403',
      name: '403',
      component: () => import('@/views/exception/403'),
    },
    {
      path: '/',
      name: '首页',
      component: TabsView,
      redirect: '/login',
      children: [
        {
          path: 'demo',
          name: '演示页',
          meta: {
            icon: 'file-ppt'
          },
          component: () => import('@/views/demo')
        },
        {
          path: 'parent1',
          name: '父级路由1',
          meta: {
            icon: 'dashboard',
          },
          component: BlankView,
          children: [
            {
              path: 'demo1',
              name: '演示页面1',
              component: () => import('@/views/demo'),
            }
          ]
        },

        {
          path: 'exception',
          name: '异常页',
          meta: {
            icon: 'warning',
          },
          component: BlankView,
          children: [
            {
              path: '404',
              name: 'Exp404',
              component: () => import('@/views/exception/404')
            },
            {
              path: '403',
              name: 'Exp403',
              component: () => import('@/views/exception/403')
            },
            {
              path: '500',
              name: 'Exp500',
              component: () => import('@/views/exception/500')
            }
          ]
        },
        {
          name: '验权页面',
          path: 'auth/demo',
          meta: {
            icon: 'file-ppt',
            authority: {
              permission: 'form',
              role: 'manager'
            },
            component: () => import('@/views/demo')
          }
        }
      ]
    }
  ]
}

export default options