<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "BrewingGuide",
  data() {
    return {
      brewingMethods: [
        {
          id: 1,
          name: 'French Press',
          description: 'A classic immersion brewing method that produces a full-bodied cup of coffee.',
          difficulty: 'Easy',
          time: '4-5 minutes'
        },
        {
          id: 2,
          name: 'Pour Over',
          description: 'A manual drip method that highlights the subtle flavors of your coffee.',
          difficulty: 'Intermediate',
          time: '3-4 minutes'
        },
        {
          id: 3,
          name: 'Aeropress',
          description: 'A versatile brewing method that can produce espresso-style coffee.',
          difficulty: 'Easy',
          time: '1-2 minutes'
        }
      ]
    }
  }
})
</script>

<template>
  <div class="brewing-guide">
    <header class="page-header">
      <div class="container">
        <h1>Coffee Brewing Guide</h1>
      </div>
    </header>

    <main class="container">
      <section class="brewing-methods">
        <h2>Popular Brewing Methods</h2>
        <div class="methods-grid">
          <div class="method-card" v-for="method in brewingMethods" :key="method.id">
            <h3>{{ method.name }}</h3>
            <p>{{ method.description }}</p>
            <ul class="method-details">
              <li>Difficulty: {{ method.difficulty }}</li>
              <li>Time: {{ method.time }}</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>

</style>
