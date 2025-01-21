<script lang="ts">
import AppNavBar from '@/components/AppNavBar.vue'
import './assets/main.css'
import AppFooter from "@/components/AppFooter.vue";

export default {
  components: {AppFooter, AppNavBar}
}

</script>

<template>
  <div class="app">
    <AppNavBar/>
    <RouterView />
    <AppFooter/>
  </div>
</template>
