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
  name: "TraditionCard",

  props: {
    tradition: {
      type: Object as PropType<CoffeeTradition>,
      required: true
    }
  },

  emits: ['openTradition']
})
</script>

<template>
  <article
    class="tradition-card"
    @click="$emit('openTradition', tradition)"
  >
    <div class="tradition-content">
      <span class="region-tag">{{ tradition.region }}</span>
      <h2>{{ tradition.title }}</h2>
      <p class="tradition-desc">{{ tradition.shortDesc }}</p>
    </div>
  </article>
</template>
