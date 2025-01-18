import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import BrewingGuide from '../views/BrewingGuide.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/brewing-guide',
      name: 'brewing-guide',
      component: BrewingGuide
    }
  ]
})

export default router
