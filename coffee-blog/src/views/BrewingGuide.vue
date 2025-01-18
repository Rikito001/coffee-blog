<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "BrewingGuide",
  
  data() {
    return {
      selectedMethod: null,
      brewingMethods: [
        {
          id: 1,
          name: 'French Press',
          description: 'A classic immersion brewing method...',
          difficulty: 'Easy',
          time: '4-5 minutes',
          fullContent: 'A classic immersion brewing method that produces a full-bodied cup of coffee.'
        },
        {
          id: 2,
          name: 'Pour Over',
          description: 'A manual drip method that highlights...',
          difficulty: 'Intermediate',
          time: '3-4 minutes',
          fullContent: 'A manual drip method that highlights the subtle flavors of your coffee.'
        },
        {
          id: 3,
          name: 'Aeropress',
          description: 'A versatile brewing method that can...',
          difficulty: 'Easy',
          time: '1-2 minutes',
          fullContent: 'A versatile brewing method that can produce espresso-style coffee.'
        }
      ]
    }
  },
  methods: {
    openMethod(method) {
      this.selectedMethod = method
    },
    closeMethod() {
      this.selectedMethod = null
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
          <div
            class="method-card"
            v-for="method in brewingMethods"
            :key="method.id"
            @click="openMethod(method)"
          >
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

    <!-- Enlarged Card Overlay -->
    <Transition name="overlay">
      <div v-if="selectedMethod" class="overlay" @click.self="closeMethod">
        <div class="enlarged-card">
          <button class="close-button" @click="closeMethod">×</button>
          <h2>{{ selectedMethod.name }}</h2>
          <p>{{ selectedMethod.fullContent }}</p>
          <ul class="method-details">
            <li>Difficulty: {{ selectedMethod.difficulty }}</li>
            <li>Time: {{ selectedMethod.time }}</li>
          </ul>
        </div>
      </div>
    </Transition>
  </div>
</template>
