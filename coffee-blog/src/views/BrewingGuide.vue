<script lang="ts">
import { defineComponent } from 'vue'
import brewingData from '@/data/brewing-data.json'
import BrewingMethodCard from '@/components/BrewingMethodCard.vue'
import SingleMethodModal from '@/components/SingleMethodModal.vue'
import ComparisonModal from '@/components/ComparisonModal.vue'

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

  components: {
    BrewingMethodCard,
    SingleMethodModal,
    ComparisonModal
  },

  data() {
    return {
      selectedMethod: null as BrewingMethod | null,
      brewingMethods: brewingData.brewingMethods as BrewingMethod[],
      selectedCategories: [] as string[],
      selectedDifficulties: [] as string[],
      methodToCompare: null as BrewingMethod | null,
      comparingWith: null as BrewingMethod | null,
      isSelectingComparison: false
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
          <BrewingMethodCard
            v-for="method in filteredMethods"
            :key="method.id"
            :method="method"
            :is-comparison-selected="method.id === methodToCompare?.id"
            :is-comparison-highlight="isSelectingComparison && method.id !== methodToCompare?.id"
            @click="openMethod"
          />
        </div>
      </section>

      <!-- Single Method Modal -->
      <SingleMethodModal
        v-if="selectedMethod"
        :method="selectedMethod"
        @close="closeMethod"
        @compare="startComparison"/>

      <!-- Comparison Modal -->
      <ComparisonModal
        v-if="methodToCompare && comparingWith"
        :method-one="methodToCompare"
        :method-two="comparingWith"
        @close="closeComparison"/>
    </main>
  </div>
</template>
