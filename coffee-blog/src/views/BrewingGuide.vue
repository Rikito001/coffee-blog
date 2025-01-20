<script lang="ts">
import { defineComponent } from 'vue'

interface BrewingMethod {
  id: number;
  name: string;
  description: string;
  category: string;
  difficulty: string;
  time: string;
  steps: string[];
  requirements: string[];
}

export default defineComponent({
  name: "BrewingGuide",

  data() {
    return {
      selectedMethod: null as BrewingMethod | null,
      brewingMethods: [
        {
          id: 1,
          name: 'French Press',
          description: 'A classic immersion brewing method that produces a full-bodied cup of coffee.',
          category: 'Immersion',
          difficulty: 'Easy',
          time: '4-5 minutes',
          steps: [
            'Coarsely grind your coffee beans',
            'Heat water to 200°F (93°C)',
            'Add coffee to the French press',
            'Pour hot water and start timer',
            'Stir gently after 1 minute',
            'Press plunger down at 4 minutes'
          ],
          requirements: [
            'French Press',
            'Coarse ground coffee',
            'Hot water (200°F)',
            'Timer',
            'Spoon for stirring'
          ]
        },
        // ... rest of the brewing methods array stays the same
      ] as BrewingMethod[]
    }
  },

  methods: {
    openMethod(method: BrewingMethod): void {
      this.selectedMethod = method
    },
    closeMethod(): void {
      this.selectedMethod = null
    }
  }
})
</script>

<template>
  <div class="brewing-guide">
    <header class="blog-header">
      <div class="container">
        <h1>Coffee Brewing Guide</h1>
        <p class="subtitle">Master the art of brewing the perfect cup</p>
      </div>
    </header>

    <main class="container">
      <section class="brewing-methods">
        <h2>Popular Brewing Methods</h2>
        <div class="blog-grid">
          <article
            v-for="method in brewingMethods"
            :key="method.id"
            class="blog-card"
            @click="openMethod(method)"
          >
            <div class="blog-content">
              <div class="blog-meta">
                <span class="category">{{ method.category }}</span>
                <span class="read-time">{{ method.time }}</span>
              </div>
              <h2>{{ method.name }}</h2>
              <p class="excerpt">{{ method.description }}</p>
              <div class="method-badges">
                <span class="difficulty">Difficulty: {{ method.difficulty }}</span>
              </div>
            </div>
          </article>
        </div>
      </section>
    </main>

    <Transition name="overlay">
      <div v-if="selectedMethod" class="overlay" @click.self="closeMethod">
        <article class="article-modal">
          <button class="close-button" @click="closeMethod">×</button>
          <div class="article-content">
            <div class="article-meta">
              <span class="category">{{ selectedMethod.category }}</span>
              <span class="read-time">{{ selectedMethod.time }}</span>
            </div>
            <h1>{{ selectedMethod.name }}</h1>
            <p class="description">{{ selectedMethod.description }}</p>

            <div class="method-details">
              <div class="requirements-section">
                <h3>What You'll Need</h3>
                <ul class="requirements-list">
                  <li v-for="(req, index) in selectedMethod.requirements" :key="index">
                    {{ req }}
                  </li>
                </ul>
              </div>

              <div class="steps-section">
                <h3>Brewing Steps</h3>
                <ol class="steps-list">
                  <li v-for="(step, index) in selectedMethod.steps" :key="index">
                    {{ step }}
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </article>
      </div>
    </Transition>
  </div>
</template>
