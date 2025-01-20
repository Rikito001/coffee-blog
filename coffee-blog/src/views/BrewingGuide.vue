<script lang="ts">
import { defineComponent } from 'vue'
import brewingData from '@/data/brewing-data.json'

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
      brewingMethods: brewingData.brewingMethods as BrewingMethod[],
      selectedCategories: [] as string[],
      selectedDifficulties: [] as string[],
      methodToCompare: null as BrewingMethod | null, // First method selected for comparison
      comparingWith: null as BrewingMethod | null,   // Second method being compared
      isSelectingComparison: false  // Whether we're in the process of selecting a second method
    }
  },

  computed: {
    categories(): string[] {
      const categories = new Set<string>()
      this.brewingMethods.forEach(method => {
        if (method.category === 'Immersion/Filter') {
          categories.add('Immersion')
          categories.add('Filter')
        } else {
          categories.add(method.category)
        }
      })
      return Array.from(categories).sort()
    },

    difficulties(): string[] {
      return [...new Set(this.brewingMethods.map(method => method.difficulty))].sort()
    },

    filteredMethods(): BrewingMethod[] {
      return this.brewingMethods.filter(method => {
        const matchesCategory = this.selectedCategories.length === 0 ||
          (method.category === 'Immersion/Filter'
            ? (this.selectedCategories.includes('Immersion') || this.selectedCategories.includes('Filter'))
            : this.selectedCategories.includes(method.category))

        const matchesDifficulty = this.selectedDifficulties.length === 0 ||
          this.selectedDifficulties.includes(method.difficulty)

        return matchesCategory && matchesDifficulty
      })
    }
  },

  methods: {
    toggleCategory(category: string): void {
      const index = this.selectedCategories.indexOf(category)
      if (index === -1) {
        this.selectedCategories.push(category)
      } else {
        this.selectedCategories.splice(index, 1)
      }
    },

    toggleDifficulty(difficulty: string): void {
      const index = this.selectedDifficulties.indexOf(difficulty)
      if (index === -1) {
        this.selectedDifficulties.push(difficulty)
      } else {
        this.selectedDifficulties.splice(index, 1)
      }
    },

    openMethod(method: BrewingMethod): void {
      if (this.isSelectingComparison) {
        if (method.id !== this.methodToCompare?.id) {
          this.comparingWith = method
        }
      } else {
        this.selectedMethod = method
      }
    },

    closeMethod(): void {
      this.selectedMethod = null
    },

    clearFilters(): void {
      this.selectedCategories = []
      this.selectedDifficulties = []
    },

    startComparison(method: BrewingMethod): void {
      this.methodToCompare = method
      this.selectedMethod = null
      this.isSelectingComparison = true
    },

    cancelComparison(): void {
      this.methodToCompare = null
      this.comparingWith = null
      this.isSelectingComparison = false
    },

    closeComparison(): void {
      this.methodToCompare = null
      this.comparingWith = null
      this.isSelectingComparison = false
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
      <div class="filter-window">
        <div class="filter-header">
          <h3>Filter Methods</h3>
          <button
            v-if="selectedCategories.length > 0 || selectedDifficulties.length > 0"
            class="clear-btn"
            @click="clearFilters"
          >
            Clear All Filters
          </button>
        </div>

        <div class="filter-section">
          <h4>Categories:</h4>
          <div class="filter-buttons">
            <button
              v-for="category in categories"
              :key="category"
              :class="['filter-btn', { active: selectedCategories.includes(category) }]"
              @click="toggleCategory(category)"
            >
              {{ category }}
            </button>
          </div>
        </div>

        <div class="filter-section">
          <h4>Difficulty Level:</h4>
          <div class="filter-buttons">
            <button
              v-for="difficulty in difficulties"
              :key="difficulty"
              :class="['filter-btn', { active: selectedDifficulties.includes(difficulty) }]"
              @click="toggleDifficulty(difficulty)"
            >
              {{ difficulty }}
            </button>
          </div>
        </div>

        <div class="filter-footer">
          <span>Showing {{ filteredMethods.length }} of {{ brewingMethods.length }} methods</span>
          <span v-if="isSelectingComparison" class="comparison-status">
            Select a method to compare with {{ methodToCompare?.name }}
            <button class="cancel-btn" @click="cancelComparison">Cancel</button>
          </span>
        </div>
      </div>

      <section class="brewing-methods">
        <div class="blog-grid">
          <article
            v-for="method in filteredMethods"
            :key="method.id"
            class="blog-card"
            :class="{
              'comparison-selected': method.id === methodToCompare?.id,
              'comparison-highlight': isSelectingComparison && method.id !== methodToCompare?.id
            }"
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

      <!-- Single Method Modal -->
      <Transition name="overlay">
        <div v-if="selectedMethod" class="overlay" @click.self="closeMethod">
          <article class="article-modal">
            <button class="close-button" @click="closeMethod">×</button>
            <div class="article-actions">
              <button class="compare-btn" @click="startComparison(selectedMethod)">
                Compare with another method
              </button>
            </div>
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

      <!-- Comparison Modal -->
      <Transition name="overlay">
        <div v-if="methodToCompare && comparingWith" class="overlay" @click.self="closeComparison">
          <div class="comparison-modal">
            <button class="close-button" @click="closeComparison">×</button>
            <div class="comparison-content">
              <div class="comparison-grid">
                <div v-for="method in [methodToCompare, comparingWith]" :key="method.id" class="comparison-column">
                  <h2>{{ method.name }}</h2>

                  <div class="comparison-section">
                    <h3>Overview</h3>
                    <div class="meta-info">
                      <p><strong>Category:</strong> {{ method.category }}</p>
                      <p><strong>Difficulty:</strong> {{ method.difficulty }}</p>
                      <p><strong>Time:</strong> {{ method.time }}</p>
                    </div>
                    <p class="description">{{ method.description }}</p>
                  </div>

                  <div class="comparison-section">
                    <h3>Requirements</h3>
                    <ul>
                      <li v-for="(req, index) in method.requirements" :key="index">
                        {{ req }}
                      </li>
                    </ul>
                  </div>

                  <div class="comparison-section">
                    <h3>Steps</h3>
                    <ol>
                      <li v-for="(step, index) in method.steps" :key="index">
                        {{ step }}
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </main>
  </div>
</template>
