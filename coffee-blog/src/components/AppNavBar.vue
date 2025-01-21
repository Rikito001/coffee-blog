<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AppNavBar',
  data() {
    return {
      isMenuOpen: false,
      navigationLinks: [
        { to: '/', text: 'Home' },
        { to: '/brewing-guide', text: 'Brewing Guide' },
        { to: '/blog', text: 'Blog' },
        { to: '/culture', text: 'Coffee Culture' },
        { to: '/build', text: 'Build a Coffee' }
      ]
    }
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
    }
  }
})
</script>

<template>
  <nav class="navbar">
    <div class="container nav-container">
      <router-link to="/" class="logo">
        Coffea
      </router-link>

      <!-- Burger Menu Button -->
      <button
        class="burger-menu"
        @click="toggleMenu"
        :aria-expanded="isMenuOpen"
        aria-label="Toggle navigation menu"
      >
        <span class="burger-line"></span>
        <span class="burger-line"></span>
        <span class="burger-line"></span>
      </button>

      <div class="nav-links" :class="{ 'nav-links-open': isMenuOpen }">
        <router-link
          v-for="link in navigationLinks"
          :key="link.to"
          :to="link.to"
          class="nav-link"
          @click="isMenuOpen = false"
        >
          {{ link.text }}
        </router-link>
      </div>
    </div>
  </nav>
</template>
