<script lang="ts">
import { defineComponent } from 'vue'
import homeData from '@/data/home-data.json'

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  author: string;
  date: string;
  fullContent: string;
}

export default defineComponent({
  name: "Home",

  data() {
    return {
      selectedPost: null as BlogPost | null,
      featuredPosts: homeData.featuredPosts as BlogPost[]
    }
  },

  methods: {
    openPost(post: BlogPost): void {
      this.selectedPost = post
    },
    closePost(): void {
      this.selectedPost = null
    }
  }
})
</script>

<template>
  <div class="home">
    <header class="blog-header">
      <div class="container">
        <h1>Welcome to Coffea</h1>
        <p class="subtitle">Exploring the world of coffee, one bean at a time</p>
      </div>
    </header>

    <main class="container">
      <section class="featured-posts">
        <h2>Latest Posts</h2>
        <div class="blog-grid">
          <article
            v-for="post in featuredPosts"
            :key="post.id"
            class="blog-card"
            @click="openPost(post)"
          >
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
        </div>
      </section>
    </main>

    <!-- Article Modal -->
    <Transition name="overlay">
      <div v-if="selectedPost" class="overlay" @click.self="closePost">
        <article class="article-modal">
          <button class="close-button" @click="closePost">×</button>
          <div class="article-content">
            <div class="article-meta">
              <span class="category">{{ selectedPost.category }}</span>
              <span class="read-time">{{ selectedPost.readTime }}</span>
            </div>
            <h1>{{ selectedPost.title }}</h1>
            <div class="author-info">
              <span class="author">By {{ selectedPost.author }}</span>
              <span class="date">{{ selectedPost.date }}</span>
            </div>
            <div class="article-body">
              {{ selectedPost.fullContent }}
            </div>
          </div>
        </article>
      </div>
    </Transition>
  </div>
</template>
