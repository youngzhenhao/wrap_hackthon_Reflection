import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('../views/home/index.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/personSapce',
    name: 'personSapce',
    component: () => import('../views/PersonalSapcePage.vue'),
    props: true,
    meta: {
      title: "用户空间",
      // needLogin: true //需要登录
    }
  },
  {
    path: '/movtype/:movtype',
    component:  () => import('../views/MoviePage.vue'),
    props: true
  },
  {
    path: '/movdetail/:hash',
    name: 'movdetail',
    component: () => import('../views/MovDetailPage.vue'),
    props: true
  },{
    path: '/video',
    component: () => import('../views/video/index.vue'),
    children: [
      {
        path: 'upload',
        component: () => import('../views/video/Upload.vue'),
      }],
    props: true
  },
];


export const router = createRouter({
  history: createWebHashHistory(),  // hash路由模式
  // history: createWebHistory(),  // history路由模式
  routes
});
// 全局路由守卫
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token')
  if (to.meta.needLogin) { // 判断该路由是否需要登录权限
    if (token) { // 判断是否已经登录
      next()
    }
    else {
      next({path: '/login'}) //跳转到登录页
    }
  } else { 
  	next()
  }
})

export default router;
