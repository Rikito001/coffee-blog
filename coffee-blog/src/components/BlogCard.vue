<script lang="ts">
import { defineComponent, type PropType } from 'vue'

interface BlogPost {
  id: number;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  category: string;
  readTime: string;
  fullContent: string;
}

export default defineComponent({
  name: "BlogCard",

  props: {
    post: {
      type: Object as PropType<BlogPost>,
      required: true
    }
  },

  emits: ['click']
})
</script>

<template>
  <article class="blog-card" @click="$emit('click')">
    <div class="blog-content">
      <div class="blog-meta">
        <span class="category">{{ post.category }}</span>
        <span class="read-time">{{ post.readTime }}</span>
      </div>
      <h2>{{ post.title }}</h2>
      <p class="excerpt">{{ post.excerpt }}</p>
      <div class="post-info">
        <span class="author">By {{ post.author }}</span>
        <span class="date">{{ post.date }}</span>
      </div>
    </div>
  </article>
</template>
