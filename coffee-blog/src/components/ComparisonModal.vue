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
  name: 'ComparisonModal',

  props: {
    methodOne: {
      type: Object as PropType<BrewingMethod>,
      required: true
    },
    methodTwo: {
      type: Object as PropType<BrewingMethod>,
      required: true
    }
  },

  emits: ['close'],

  methods: {
    handleClose() {
      this.$emit('close')
    }
  }
})
</script>

<template>
  <Transition name="overlay">
    <div class="overlay" @click.self="handleClose">
      <div class="comparison-modal">
        <button class="close-button" @click="handleClose">×</button>
        <div class="comparison-content">
          <div class="comparison-grid">
            <div v-for="method in [methodOne, methodTwo]" :key="method.id" class="comparison-column">
              <h2>{{ method.name }}</h2>

              <div class="comparison-section">
                <h3>Overview</h3>
                <div class="meta-info">
                  <p><strong>Category:</strong> {{ method.category }}</p>
                  <p><strong>Difficulty:</strong> {{ method.difficulty }}</p>
                  <p><strong>Time:</strong> {{ method.time }}</p>
                </div>
                <p class="description">{{ method.description }}</p>
              </div>

              <div class="comparison-section">
                <h3>Requirements</h3>
                <ul>
                  <li v-for="(req, index) in method.requirements" :key="index">
                    {{ req }}
                  </li>
                </ul>
              </div>

              <div class="comparison-section">
                <h3>Steps</h3>
                <ol>
                  <li v-for="(step, index) in method.steps" :key="index">
                    {{ step }}
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>
