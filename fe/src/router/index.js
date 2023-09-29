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
  ]
})

export default router
