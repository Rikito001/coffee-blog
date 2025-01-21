<script lang="ts">
import { defineComponent } from 'vue'
import cultureData from '@/data/culture-data.json'
import TraditionCard from '@/components/TraditionCard.vue'
import TraditionModal from '@/components/TraditionModal.vue'

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

  components: {
    TraditionCard,
    TraditionModal
  },

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
        <h1>Coffee Cultures of the World</h1>
        <p class="subtitle">Exploring coffee traditions and rituals across different cultures</p>
      </div>
    </header>

    <main class="container">
      <section class="traditions-grid">
        <TraditionCard
          v-for="tradition in traditions"
          :key="tradition.id"
          :tradition="tradition"
          @open-tradition="openTradition"
        />
      </section>
    </main>

    <TraditionModal
      v-if="selectedTradition"
      :tradition="selectedTradition"
      @close="closeTradition"
    />
  </div>
</template>
