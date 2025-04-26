import AuthMain from '@/views/AuthMain.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/auth',
      props: route => ({ authType: route.query.authType }),

      name: 'auth',
      component: AuthMain,
    },
    {
      path: '/players',
      name: 'players',
      component: () => import('@/views/HomeView.vue'),
      meta: {
        auth: true,
      },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: AuthMain,
    },
  ],
});

// router.beforeEach((to, from, next) => {
//   const authStore = useAuthStore();
//   if (to?.meta?.auth && !authStore.userInfo.token) {
//     return next({
//       path: '/auth',
//       query: {
//         authType: 'signUp',
//       },
//     });
//   };
//   next();
// });

export default router;
