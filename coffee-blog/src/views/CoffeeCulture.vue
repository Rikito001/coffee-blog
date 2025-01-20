<script lang="ts">
import { defineComponent } from 'vue'

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
      traditions: [
        {
          id: 1,
          region: 'Ethiopia',
          title: 'Ethiopian Coffee Ceremony',
          shortDesc: 'Experience the birthplace of coffee...',
          fullContent: `The Ethiopian coffee ceremony is a unique and important part of Ethiopian culture. This intimate ceremony can last for hours and is typically performed by the woman of the household. The ceremony begins with the washing of green coffee beans, then roasting them in a pan over hot coals.

The aromatic smoke is wafted around for everyone to appreciate, and the beans are then ground using a traditional mortar and pestle. The coffee is brewed three times: the first round called 'Abol', the second 'Tona', and the third 'Baraka'. Each round becomes progressively weaker but is equally important to the ceremony.`,
          traditions: [
            'Burning of incense during ceremony',
            'Three rounds of brewing',
            'Serving with snacks like popcorn',
            'Traditional clay pot (jebena) usage'
          ]
        },
        {
          id: 2,
          region: 'Japan',
          title: 'Japanese Coffee Houses',
          shortDesc: 'The art of precision and patience...',
          fullContent: `Japanese coffee culture is characterized by meticulous attention to detail and a deep respect for craft. The kissaten (traditional Japanese coffee houses) have been serving carefully brewed coffee since the early 20th century. These establishments often specialize in pour-over coffee, prepared with scientific precision.

The Japanese approach to coffee brewing has influenced modern coffee culture worldwide, particularly in the popularity of pour-over methods and the emphasis on precise measurements and timing.`,
          traditions: [
            'Precise pour-over technique',
            'Traditional kissaten atmosphere',
            'Seasonal coffee menus',
            'Coffee equipment innovation'
          ]
        },
        {
          id: 3,
          region: 'Italy',
          title: 'Italian Espresso Culture',
          shortDesc: 'The heart of espresso tradition...',
          fullContent: `Italian coffee culture is perhaps the most influential in the world, giving us terms like espresso, cappuccino, and latte. In Italy, coffee is more than just a beverage - it's a way of life. The day begins with a cappuccino (never after 11 AM!) and continues with quick espresso shots at the local bar.

Standing at the bar to drink your espresso is a typical Italian tradition, as is the social aspect of coffee drinking. The Italian approach to coffee has shaped café culture worldwide.`,
          traditions: [
            'Standing at the bar for espresso',
            'No cappuccino after 11 AM',
            'Social aspect of coffee drinking',
            'Regional coffee variations'
          ]
        }
      ] as CoffeeTradition[]
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
