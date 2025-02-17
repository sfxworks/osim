import {createRouter, createWebHistory} from 'vue-router'
import IndexView from '../views/IndexView.vue'
import LoginView from '../views/LoginView.vue';
import FlawDetailView from '../views/FlawDetailView.vue';
import TrackerView from '../views/TrackerView.vue';
import {useUserStore} from '@/stores/UserStore';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: IndexView,
    },
    {
      path: '/flaws/:id',
      name: 'flaw-details',
      props: true,
      component: FlawDetailView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        hideNavbar: true,
      },
    },
    {
      path: '/tracker',
      name: 'tracker',
      component: TrackerView,
    },

    // {
    //   path: '/flaw-details',
    //   name: 'flaw-details',
    //   component: FlawView,
    // },

    // {
    //   path: '/about/:id',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // },
  ]
})


router.beforeEach((to, from) => {
  const {isAuthenticated} = useUserStore();

  if (isAuthenticated()) {
    if (to.name === 'login') {
      return false;
    }
  } else {
    if (to.name !== 'login') {
      return {name: 'login'};
    }
  }
})

export default router
