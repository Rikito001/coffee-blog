import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import BrewingGuide from '../views/BrewingGuide.vue'
import CoffeeBlog from '../views/CoffeeBlog.vue'
import CoffeeCulture from '../views/CoffeeCulture.vue'
import CoffeeBuilder from "@/views/CoffeeBuilder.vue"
import NotFound from '@/views/NotFound.vue'

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
    },
    {
      path: '/blog',
      name: 'blog',
      component: CoffeeBlog
    },
    {
      path: '/culture',
      name: 'culture',
      component: CoffeeCulture
    },
    {
      path: '/build',
      name: 'build',
      component: CoffeeBuilder
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFound
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  }
})

export default router
