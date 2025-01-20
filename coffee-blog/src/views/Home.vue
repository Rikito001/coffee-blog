<script lang="ts">
import { defineComponent } from 'vue'
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
      featuredPosts: [
        {
          id: 1,
          title: 'The Art of Pour Over Coffee',
          excerpt: 'Master the technique of pour over brewing for the perfect cup every morning.',
          category: 'Brewing',
          readTime: '5 min read',
          author: 'James Wilson',
          date: 'January 18, 2025',
          fullContent: 'Master the technique of pour over brewing for the perfect cup. This method brings out subtle flavors and produces a clean, crisp cup of coffee. Learn about water temperature, grind size, and pouring techniques that will elevate your coffee experience.'
        },
        {
          id: 2,
          title: 'Understanding Coffee Roast Levels',
          excerpt: 'From light to dark: discover how roasting affects your coffee\'s flavor profile.',
          category: 'Roasting',
          readTime: '4 min read',
          author: 'Maria Garcia',
          date: 'January 19, 2025',
          fullContent: 'From light to dark: how roasting affects coffee flavor profiles. Explore the complex world of coffee roasting and learn how different roast levels bring out unique characteristics in your coffee beans.'
        },
        {
          id: 3,
          title: 'Best Coffee Regions of 2025',
          excerpt: 'Explore the finest coffee-growing regions and their unique flavor characteristics.',
          category: 'Origins',
          readTime: '6 min read',
          author: 'Chen Wei',
          date: 'January 20, 2025',
          fullContent: 'Exploring the finest coffee-growing regions around the world. Discover how altitude, climate, and soil conditions contribute to the distinct flavors found in different coffee origins.'
        }
      ] as BlogPost[]
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
