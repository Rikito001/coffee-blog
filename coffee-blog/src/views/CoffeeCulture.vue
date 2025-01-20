<script lang="ts">
import { defineComponent } from 'vue'
import cultureData from '@/data/culture-data.json'

interface CoffeeTradition {
  id: number;
  region: string;
  title: string;
  shortDesc: string;
  fullContent: string;
  traditions: string[];
}

export default defineComponent({
  name: "CoffeeCulture",

  data() {
    return {
      selectedTradition: null as CoffeeTradition | null,
      traditions: cultureData.traditions as CoffeeTradition[]
    }
  },

  methods: {
    openTradition(tradition: CoffeeTradition): void {
      this.selectedTradition = tradition
    },
    closeTradition(): void {
      this.selectedTradition = null
    }
  }
})
</script>

<template>
  <div class="culture">
    <header class="culture-header">
      <div class="container">
        <h1>Coffee Cultures Around the World</h1>
        <p class="subtitle">Exploring coffee traditions and rituals across different cultures</p>
      </div>
    </header>

    <main class="container">
      <section class="traditions-grid">
        <article
          v-for="tradition in traditions"
          :key="tradition.id"
          class="tradition-card"
          @click="openTradition(tradition)"
        >
          <div class="tradition-content">
            <span class="region-tag">{{ tradition.region }}</span>
            <h2>{{ tradition.title }}</h2>
            <p class="tradition-desc">{{ tradition.shortDesc }}</p>
          </div>
        </article>
      </section>
    </main>

    <Transition name="overlay">
      <div v-if="selectedTradition" class="overlay" @click.self="closeTradition">
        <article class="tradition-modal">
          <button class="close-button" @click="closeTradition">×</button>
          <div class="tradition-modal-content">
            <span class="region-tag">{{ selectedTradition.region }}</span>
            <h1>{{ selectedTradition.title }}</h1>
            <div class="tradition-body">
              {{ selectedTradition.fullContent }}
            </div>
            <div class="traditions-list">
              <h3>Key Traditions</h3>
              <ul>
                <li v-for="(item, index) in selectedTradition.traditions" :key="index">
                  {{ item }}
                </li>
              </ul>
            </div>
          </div>
        </article>
      </div>
    </Transition>
  </div>
</template>
