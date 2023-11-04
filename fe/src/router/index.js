import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import ExplorePage from '../views/ExplorePage.vue'
import UniHomepage from '../views/UniHomePage.vue'
import ProfilePage from '../views/ProfilePage.vue'
import DiscussionPage from '../views/DiscussionPage.vue'
import ThreadPage from '../views/ThreadPage.vue'
import ExploreCitiesPage from '../views/ExploreCitiesPage.vue'
import CitiesHomePage from '../views/CitiesHomePage.vue'

import {useAuthStore} from '@/stores'

const DEFAULT_TITLE = 'UniExplorers';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'LandingPage',
      component: LandingPage
    },
    {
      path: '/explore',
      name: 'ExplorePage',
      component: ExplorePage
    },
    {
      path: '/uni/:uniName',
      name: 'UniHomePage',
      component: UniHomepage
    },
    {
      path: '/profile/:handle',
      name: 'ProfilePage',
      component: ProfilePage
    },
    {
      path: '/discussionpage',
      name: 'DiscussionPage',
      component: DiscussionPage
    },
    {
      path: "/AMApage",
      name: "AMA",
      component: ThreadPage
    },
    {
      path: '/uni/:uniName/discussions',
      name: 'uniDiscussions',
      component: DiscussionPage
    },
    {
      path: "/uni/:uniName/discussions/:thread",
      name: "uniDiscussionsThread",
      component: ThreadPage
    },
    {
      path:'/explorecitiespage',
      name: 'ExploreCitiesPage',
      component: ExploreCitiesPage
    },
    {
      path: '/city/:continent/:cityName',
      name: 'CitiesHomePage',
      component: CitiesHomePage
    },

    // Otherwise, redirect to home
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})

router.beforeEach(async (to) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/'];
  const authRequired = !publicPages.includes(to.path);
  const auth = useAuthStore();

  to.meta.title = DEFAULT_TITLE;
  document.title = DEFAULT_TITLE;

  if (authRequired && !auth.user) {
      auth.returnUrl = to.fullPath;
      return '/login';
  }
  
  if (auth.user && to.path == '/') {
    return '/explore'
  }
});

export default router
