<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NotFound',

  methods: {
    goBack(): void {
      this.$router.go(-1)
    }
  }
})
</script>

<template>
  <div class="error-page">
    <header class="blog-header">
      <div class="container">
        <h1>404 - Page Not Found</h1>
        <p class="subtitle">Oops! Looks like this coffee got lost in brewing</p>
      </div>
    </header>

    <main class="container error-content">
      <div class="error-message">
        <p>The page you're looking for doesn't exist or has been moved.</p>
        <button class="back-button" @click="goBack">
          Go Back
        </button>
      </div>
    </main>
  </div>
</template>
