<script lang="ts">
import { defineComponent, type PropType } from 'vue'

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
  name: 'BrewingMethodCard',

  props: {
    method: {
      type: Object as PropType<BrewingMethod>,
      required: true
    },
    isComparisonSelected: {
      type: Boolean,
      default: false
    },
    isComparisonHighlight: {
      type: Boolean,
      default: false
    }
  },

  emits: ['click'],

  methods: {
    handleClick() {
      this.$emit('click', this.method)
    }
  }
})
</script>

<template>
  <article
    class="blog-card"
    :class="{
      'comparison-selected': isComparisonSelected,
      'comparison-highlight': isComparisonHighlight
    }"
    @click="handleClick"
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
</template>
