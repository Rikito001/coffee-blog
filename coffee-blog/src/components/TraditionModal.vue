<script lang="ts">
import { defineComponent, type PropType } from 'vue'

interface CoffeeTradition {
  id: number;
  region: string;
  title: string;
  shortDesc: string;
  fullContent: string;
  traditions: string[];
}

export default defineComponent({
  name: "TraditionModal",

  props: {
    tradition: {
      type: Object as PropType<CoffeeTradition>,
      required: true
    }
  },

  emits: ['close']
})
</script>

<template>
  <Transition name="overlay">
    <div class="overlay" @click.self="$emit('close')">
      <article class="article-modal">
        <button class="close-button" @click="$emit('close')">×</button>
        <div class="article-content">
          <div class="article-meta">
            <span class="category">{{ tradition.region }}</span>
          </div>
          <h1>{{ tradition.title }}</h1>
          <div class="article-body">
            {{ tradition.fullContent }}
          </div>
          <div class="traditions-section">
            <h3>Key Traditions</h3>
            <ul class="traditions-list">
              <li v-for="(item, index) in tradition.traditions" :key="index">
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </article>
    </div>
  </Transition>
</template>
