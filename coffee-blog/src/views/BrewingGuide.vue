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
      selectedDifficulties: [] as string[]
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
      this.selectedMethod = method
    },

    closeMethod(): void {
      this.selectedMethod = null
    },

    clearFilters(): void {
      this.selectedCategories = []
      this.selectedDifficulties = []
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
          Showing {{ filteredMethods.length }} of {{ brewingMethods.length }} methods
        </div>
      </div>

      <section class="brewing-methods">
        <div class="blog-grid">
          <article
            v-for="method in filteredMethods"
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

<style scoped>
.filter-window {
  background: white;
  border-radius: 12px;
  box-shadow: var(--shadow-md);
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.filter-header h3 {
  color: var(--coffee-dark);
  font-size: 1.2rem;
  margin: 0;
}

.filter-section {
  margin-bottom: 1.5rem;
}

.filter-section h4 {
  color: var(--coffee-dark);
  font-size: 1rem;
  margin-bottom: 0.75rem;
}

.filter-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.filter-btn {
  background: none;
  border: 2px solid var(--coffee-light);
  color: var(--coffee-dark);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.filter-btn:hover {
  border-color: var(--coffee-medium);
}

.filter-btn.active {
  background: var(--coffee-light);
  color: white;
  border-color: var(--coffee-light);
}

.clear-btn {
  background: none;
  border: 1px solid var(--coffee-medium);
  color: var(--coffee-medium);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.clear-btn:hover {
  background: var(--coffee-medium);
  color: white;
}

.filter-footer {
  color: var(--coffee-medium);
  font-size: 0.9rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .filter-window {
    padding: 1rem;
  }

  .filter-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .filter-btn {
    font-size: 0.8rem;
    padding: 0.4rem 0.8rem;
  }

  .filter-section {
    margin-bottom: 1rem;
  }
}
</style>
