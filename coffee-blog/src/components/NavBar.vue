<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "Navbar"
})
</script>

<template>
  <nav class="navbar">
    <div class="container nav-container">
      <router-link to="/" class="logo">
        Coffea
      </router-link>
      <div class="nav-links">
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link to="/brewing-guide" class="nav-link">Brewing Guide</router-link>
      </div>
    </div>
  </nav>
</template>

<style scoped>

</style>
