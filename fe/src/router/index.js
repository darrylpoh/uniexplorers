import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import ExplorePage from '../views/ExplorePage.vue'
import UniHomepage from '../views/UniHomepage.vue'
import ProfilePage from '../views/ProfilePage.vue'
import DiscussionPage from '../views/DiscussionPage.vue'
import AMAPage from '../components/AMAPage.vue'

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
      path: '/unihomepage',
      name: 'UniHomePage',
      component: UniHomepage
    },
    {
      path: '/profilepage',
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
  ]
})

export default router
