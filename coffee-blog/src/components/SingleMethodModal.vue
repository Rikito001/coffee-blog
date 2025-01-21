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
  name: 'SingleMethodModal',

  props: {
    method: {
      type: Object as PropType<BrewingMethod>,
      required: true
    }
  },

  emits: ['close', 'compare'],

  methods: {
    handleClose() {
      this.$emit('close')
    },

    handleCompare() {
      this.$emit('compare', this.method)
    }
  }
})
</script>

<template>
  <Transition name="overlay">
    <div class="overlay" @click.self="handleClose">
      <article class="article-modal">
        <button class="close-button" @click="handleClose">×</button>
        <div class="article-actions">
          <button class="compare-btn" @click="handleCompare">
            Compare with another method
          </button>
        </div>
        <div class="article-content">
          <div class="article-meta">
            <span class="category">{{ method.category }}</span>
            <span class="read-time">{{ method.time }}</span>
          </div>
          <h1>{{ method.name }}</h1>
          <p class="description">{{ method.description }}</p>

          <div class="method-details">
            <div class="requirements-section">
              <h3>What You'll Need</h3>
              <ul class="requirements-list">
                <li v-for="(req, index) in method.requirements" :key="index">
                  {{ req }}
                </li>
              </ul>
            </div>

            <div class="steps-section">
              <h3>Brewing Steps</h3>
              <ol class="steps-list">
                <li v-for="(step, index) in method.steps" :key="index">
                  {{ step }}
                </li>
              </ol>
            </div>
          </div>
        </div>
      </article>
    </div>
  </Transition>
</template>
