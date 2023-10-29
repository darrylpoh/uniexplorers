import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import ExplorePage from '../views/ExplorePage.vue'
import UniHomepage from '../views/UniHomepage.vue'
import ProfilePage from '../views/ProfilePage.vue'
import DiscussionPage from '../views/DiscussionPage.vue'
import AMAPage from '../components/AMAPage.vue'
import ExploreCitiesPage from '../views/ExploreCitiesPage.vue'
import CitiesHomePage from '../views/CitiesHomePage.vue'

import {useAuthStore} from '@/stores'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
      component: AMAPage
    },
    {
      path: '/uni/:uniName/discussions',
      name: 'uniDiscussions',
      component: DiscussionPage
    },
    {
      path: "/uni/:uniName/discussions/:thread",
      name: "uniDiscussionsThread",
      component: AMAPage
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

  if (authRequired && !auth.user) {
      auth.returnUrl = to.fullPath;
      return '/login';
  }
  
  if (auth.user && to.path == '/') {
    return '/explore'
  }
});

export default router
