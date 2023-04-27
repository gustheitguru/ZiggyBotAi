import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from "firebase/auth";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'LandingPage',
      component: () => import('../views/LandingPage.vue'),
      meta: {
        requiresAuth: false,
      }
    }, 
    {
      path: '/settings',
      name: 'Settings',
      component: () => import('../views/Settings.vue'),
      meta: {
        requiresAuth: true,
      }
    },    {
      path: '/mobile',
      name: 'MobileChat',
      component: () => import('../views/MobileChat.vue'),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/chat',
      name: 'ZiggyBotAI',
      component: () => import('../views/ChatBox.vue'),
      meta: {
        requiresAuth: true,
      }
    }
  ]
});

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
        (user) => {
          removeListener();
          resolve(user);
        },
      reject
    )
  });


};

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const user = await getCurrentUser();
    if (user) {
      next();
    } else {
      alert("You don't have access!");
      next("/");
    }
  } else {
    next();
  }
});


export default router
