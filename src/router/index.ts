import { createRouter, createWebHistory } from 'vue-router'
import SignUp  from "@/views/SignUp.vue";
// import { useRouter, onBeforeRouteUpdate, onBeforeRouteLeave } from 'vue-router';

// const routerVue = useRouter();

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
      component: () => import("@/views/SignIn.vue"),
    },
    {
      path: '/players',
      name: 'players',
      component: () => import("@/views/HomeView.vue"),
      meta: {
        requiresAuth: true,
        roles: ['auth']
      }
    },
    {
     path: '/:pathMatch(.*)*', name: 'NotFound', component: SignUp ,

}
  ],
})

// onBeforeRouteUpdate((to, from, next) => {
//   if (!routerVue.hasRoute(to.name)) {
//     next({ name: 'NotFound' });
//   } else {
//     next();
//   }
// });



export default router
