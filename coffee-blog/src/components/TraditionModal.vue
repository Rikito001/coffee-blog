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
      <article class="tradition-modal">
        <button class="close-button" @click="$emit('close')">×</button>
        <div class="tradition-modal-content">
          <span class="region-tag">{{ tradition.region }}</span>
          <h1>{{ tradition.title }}</h1>
          <div class="tradition-body">
            {{ tradition.fullContent }}
          </div>
          <div class="traditions-list">
            <h3>Key Traditions</h3>
            <ul>
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
