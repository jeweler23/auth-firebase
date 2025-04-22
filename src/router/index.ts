import { useAuthStore } from '@/stores/auth.ts';
import SignUp from '@/views/SignUp.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/signup',
      name: 'signup',
      component: SignUp,
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('@/views/SignIn.vue'),
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
component: SignUp,

    },
  ],
});


router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to?.meta?.auth && !authStore.userInfo.token) {
    next('/signin');
    return;
  }
  next();
});

export default router;
