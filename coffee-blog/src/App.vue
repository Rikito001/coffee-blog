<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'
import './assets/main.css'
</script>

<template>
  <div class="app">
    <NavBar />
    <RouterView />
    <Footer />
  </div>
</template>
