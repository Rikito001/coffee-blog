<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "Home",

  data() {
    return {
      selectedPost: null,
      featuredPosts: [
        {
          id: 1,
          title: 'The Art of Pour Over Coffee',
          excerpt: 'Master the technique of pour over brewing...',
          fullContent: 'Master the technique of pour over brewing for the perfect cup of coffee.'
        },
        {
          id: 2,
          title: 'Understanding Coffee Roast Levels',
          excerpt: 'From light to dark: how roasting affects...',
          fullContent: 'From light to dark: how roasting affects coffee flavor profiles.'
        },
        {
          id: 3,
          title: 'Best Coffee Regions of 2025',
          excerpt: 'Exploring the finest coffee-growing regions...',
          fullContent: 'Exploring the finest coffee-growing regions around the world.'
        }
      ]
    }
  },
  methods: {
    openPost(post) {
      this.selectedPost = post
    },
    closePost() {
      this.selectedPost = null
    }
  }
})
</script>

<template>
  <div class="home">
    <header class="hero">
      <div class="container">
        <h1>Welcome to Coffea</h1>
        <p>Exploring the world of coffee, one bean at a time</p>
      </div>
    </header>

    <main class="container">
      <section class="featured-posts">
        <h2>Latest Posts</h2>
        <div class="posts-grid">
          <article class="post-card" v-for="post in featuredPosts" :key="post.id" @click="openPost(post)">
            <h3>{{ post.title }}</h3>
            <p>{{ post.excerpt }}</p>
          </article>
        </div>
      </section>
    </main>

    <!-- Enlarged Card Overlay -->
    <Transition name="overlay">
      <div v-if="selectedPost" class="overlay" @click.self="closePost">
        <div class="enlarged-card">
          <button class="close-button" @click="closePost">×</button>
          <h2>{{ selectedPost.title }}</h2>
          <p>{{ selectedPost.fullContent }}</p>
        </div>
      </div>
    </Transition>
  </div>
</template>
