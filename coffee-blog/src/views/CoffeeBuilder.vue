<script lang="ts">
import { defineComponent } from 'vue'
import { useCoffeeStore } from '@/stores/coffee'

export default defineComponent({
  name: 'CoffeeBuilder',

  mounted() {
    // Update total height when component is mounted
    this.store.updateTotalHeight()
  },

  computed: {
    store() {
      return useCoffeeStore()
    },

    coffeeName() {
      return this.store.coffeeName
    },

    currentCoffeeType() {
      return this.store.currentCoffeeType
    },

    totalHeight() {
      return this.store.totalHeight
    },

    customIngredients() {
      return this.store.customIngredients
    },

    coffeeTypes() {
      return this.store.coffeeTypes
    },

    ingredientOptions() {
      return [
        { id: 'whipped_cream', name: 'Whipped Cream', color: 'var(--whipped_cream-color)', order: 1 },
        { id: 'milk_foam', name: 'Milk Foam', color: 'var(--milk_foam-color)', order: 2 },
        { id: 'steamed_milk', name: 'Steamed Milk', color: 'var(--steamed_milk-color)', order: 3 },
        { id: 'milk', name: 'Milk', color: 'var(--milk-color)', order: 4 },
        { id: 'water', name: 'Water', color: 'var(--water-color)', order: 5 },
        { id: 'liquor', name: 'Liquor', color: 'var(--liquor-color)', order: 6 },
        { id: 'chocolate', name: 'Chocolate', color: 'var(--chocolate-color)', order: 7 },
        { id: 'coffee', name: 'Coffee', color: 'var(--coffee-color)', order: 8 }
      ].sort((a, b) => b.order - a.order)
    }
  },

  methods: {
    changeCoffeeType(type: string) {
      this.store.changeCoffeeType(type)
    },

    updateIngredient(ingredient: string, value: number) {
      this.store.updateIngredient(ingredient, value)
    },

    getCustomStyle(ingredient: string, index: number) {
      let heightSum = 0
      let ingredientFound = false

      for (const ing of this.ingredientOptions) {
        if (ing.id === ingredient) {
          ingredientFound = true
          continue
        }
        if (!ingredientFound) {
          heightSum += this.customIngredients[ing.id]
        }
      }

      const height = this.customIngredients[ingredient]
      return {
        height: height > 0 ? `${height}%` : '0%',
        bottom: `${heightSum}%`,
        transition: 'all 0.3s ease-in-out',
        opacity: height > 0 ? 1 : 0
      }
    }
  }
})
</script>

<template>
  <div class="coffee-builder">
    <header class="blog-header">
      <div class="container">
        <h1>Build Your Coffee</h1>
        <p class="subtitle">Choose a preset or create your own blend</p>
      </div>
    </header>

    <div class="builder-container">
      <div class="controls-section">
        <div class="options">
          <button
            v-for="type in coffeeTypes"
            :key="type"
            :class="{ selected: currentCoffeeType === type }"
            @click="changeCoffeeType(type)"
          >
            {{ type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') }}
          </button>
        </div>
      </div>

      <div class="coffee-display">
        <h2 class="coffee-name">{{ coffeeName }}</h2>
        <div class="cup">
          <div class="filling">
            <template v-for="(ingredient, index) in ingredientOptions" :key="ingredient.id">
              <div
                :class="[ingredient.id, { active: customIngredients[ingredient.id] > 0 }]"
                :style="getCustomStyle(ingredient.id, index)"
              >
                {{ ingredient.name }}
              </div>
            </template>
          </div>
          <div class="plate"></div>
        </div>
      </div>

      <div class="custom-controls">
        <h3>Customize Ingredients</h3>
        <div class="custom-controls-content">
          <div class="remaining-space" :class="{ full: totalHeight >= 100 }">
            Available: {{ 100 - totalHeight }}%
          </div>
          <div
            v-for="ingredient in ingredientOptions"
            :key="ingredient.id"
            class="ingredient-control"
            :class="{ active: customIngredients[ingredient.id] > 0 }"
          >
            <label :for="ingredient.id">
              <span
                class="color-preview"
                :style="{ backgroundColor: ingredient.color }"
              ></span>
              {{ ingredient.name }}
            </label>
            <input
              :id="ingredient.id"
              type="range"
              min="0"
              max="100"
              step="5"
              :value="customIngredients[ingredient.id]"
              @input="updateIngredient(ingredient.id, $event.target.value)"
            >
            <span class="percentage">{{ customIngredients[ingredient.id] }}%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.builder-container {
  display: grid;
  grid-template-columns: 150px 1fr 300px;
  gap: 2rem;
  padding: 2rem;
  min-height: 70vh;
  background-color: var(--main-bg-color);
  align-items: start;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 1vh;
}

.options button {
  user-select: none;
  background: rgba(214, 217, 227, 0.6);
  outline: none;
  font-size: 1rem;
  border: 2px solid #a67a60;
  box-shadow: none;
  color: #363636;
  box-sizing: border-box;
  border-radius: 1vh;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0.5rem;
  height: 35px;
}

.options button:hover {
  border-width: 4px;
  background: rgba(255, 255, 255, 0.6);
}

.options .selected {
  border-width: 4px;
  background: rgba(255, 255, 255, 0.8);
}

.coffee-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 1rem;
  position: sticky;
  top: 2rem;
}

.coffee-name {
  color: var(--coffee-dark);
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
}

.warning {
  color: #e74c3c;
  font-weight: bold;
  margin-top: 1rem;
}

.cup {
  width: var(--cup-width);
  height: var(--cup-height);
  border-radius: 0 0 10vw 10vw;
  position: relative;
  background-color: var(--cup-color);
  z-index: 10;
  box-sizing: border-box;
}

.cup::after {
  content: "";
  position: absolute;
  top: 10%;
  left: calc(100% - 1vw);
  width: var(--cup-handle-width);
  height: var(--cup-handle-height);
  border: var(--main-border);
  border-radius: 50% 30%;
}

.plate {
  position: absolute;
  top: calc(100% + 1vw);
  left: calc((var(--cup-width) - var(--plate-width)) / 2);
  width: var(--plate-width);
  background: var(--cup-color);
  height: var(--plate-height);
  border-radius: 1vw;
}

.filling {
  position: absolute;
  left: calc(var(--cup-border-width) / 2);
  bottom: 1vw;
  width: var(--cup-inside-width);
  height: var(--cup-inside-height);
  overflow: hidden;
  border-radius: 0 0 10vw 10vw;
  background-color: var(--main-bg-color);
}

.filling.overflow {
  background-color: rgba(231, 76, 60, 0.1);
}

.filling div {
  position: absolute;
  width: 100%;
  transition: all 0.3s ease;
  color: transparent;
  font-size: 0.8rem;
  box-sizing: border-box;
}

div.chocolate {
  background: var(--chocolate-color);
}
div.coffee {
  background: var(--coffee-color);
}
div.liquor {
  background: var(--liquor-color);
}
div.milk {
  background: var(--milk-color);
}
div.milk_foam {
  background: var(--milk_foam-color);
}
div.steamed_milk {
  background: var(--steamed_milk-color);
}
div.water {
  background: var(--water-color);
}
div.whipped_cream {
  background: var(--whipped_cream-color);
}

.custom-controls {
  background: rgba(255, 255, 255, 0.9);
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-height: 80vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.custom-controls h3 {
  margin-bottom: 1rem;
  color: var(--coffee-dark);
  font-size: 1.2rem;
  padding-right: 1rem;
}

.custom-controls-content {
  overflow-y: auto;
  padding-right: 0.5rem;
}

.ingredient-control {
  margin-bottom: 1rem;
  display: grid;
  grid-template-columns: minmax(100px, 1fr) 100px 45px;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  box-sizing: border-box;
}

.ingredient-control label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--coffee-dark);
  font-size: 0.9rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ingredient-control.active label {
  font-weight: bold;
}

.color-preview {
  min-width: 16px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
}

input[type="range"] {
  width: 100%;
  min-width: 0;
  -webkit-appearance: none;
  height: 8px;
  background: var(--coffee-light);
  border-radius: 4px;
  outline: none;
  opacity: 0.7;
  transition: opacity 0.2s;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 18px;
  height: 18px;
  background: var(--coffee-dark);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
}

input[type="range"]::-moz-range-thumb {
  width: 18px;
  height: 18px;
  background: var(--coffee-dark);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
}

input[type="range"]:hover {
  opacity: 1;
}

.percentage {
  font-size: 0.9rem;
  color: var(--coffee-dark);
  text-align: right;
  min-width: 45px;
  padding-right: 0.5rem;
}

.remaining-space {
  text-align: right;
  color: var(--coffee-dark);
  font-size: 0.9rem;
  margin-bottom: 1rem;
  padding-right: 0.5rem;
}

.remaining-space.full {
  color: #e74c3c;
  font-weight: bold;
}

@media (max-width: 1024px) {
  .builder-container {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
    gap: 2rem;
  }

  .options {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 0.5rem;
  }

  .custom-controls {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
  }
}

@media (max-width: 768px) {
  .builder-container {
    padding: 1rem;
  }

  .cup {
    width: 60vw;
    height: 48vw;
  }

  .ingredient-control {
    grid-template-columns: minmax(80px, 1fr) 80px 45px;
  }
}

@media (max-width: 480px) {
  .options button {
    font-size: 0.9rem;
    padding: 0.25rem;
  }

  .cup {
    width: 80vw;
    height: 64vw;
  }

  .custom-controls {
    padding: 1rem;
  }

  .ingredient-control {
    grid-template-columns: minmax(80px, 1fr) 70px 40px;
    gap: 0.25rem;
  }

  .ingredient-control label {
    font-size: 0.8rem;
  }

  .coffee-name {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  .percentage {
    font-size: 0.8rem;
    min-width: 40px;
  }
}
</style>
