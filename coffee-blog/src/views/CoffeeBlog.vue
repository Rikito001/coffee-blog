<script lang="ts">
import { defineComponent } from 'vue'
import blogData from '@/data/blog-data.json'
import BlogCard from '@/components/BlogCard.vue'

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
  name: "CoffeeBlog",

  components: {
    BlogCard
  },

  data() {
    return {
      selectedPost: null as BlogPost | null,
      blogPosts: blogData.blogPosts as BlogPost[],
      selectedCategories: [] as string[],
      sortBy: 'dateDesc' // Default sort
    }
  },

  computed: {
    categories(): string[] {
      return [...new Set(this.blogPosts.map(post => post.category))].sort()
    },

    filteredPosts(): BlogPost[] {
      let posts = this.blogPosts

      // Apply category filter
      if (this.selectedCategories.length > 0) {
        posts = posts.filter(post =>
          this.selectedCategories.includes(post.category)
        )
      }

      // Apply sorting
      return this.sortPosts([...posts])
    }
  },

  methods: {
    toggleCategory(category: string): void {
      const index = this.selectedCategories.indexOf(category)
      if (index === -1) {
        this.selectedCategories.push(category)
      } else {
        this.selectedCategories.splice(index, 1)
      }
    },

    openPost(post: BlogPost): void {
      this.selectedPost = post
    },

    closePost(): void {
      this.selectedPost = null
    },

    clearFilters(): void {
      this.selectedCategories = []
    },

    sortPosts(posts: BlogPost[]): BlogPost[] {
      switch (this.sortBy) {
        case 'dateAsc':
          return posts.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        case 'dateDesc':
          return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        case 'readTimeAsc':
          return posts.sort((a, b) => parseInt(a.readTime) - parseInt(b.readTime))
        case 'readTimeDesc':
          return posts.sort((a, b) => parseInt(b.readTime) - parseInt(a.readTime))
        default:
          return posts
      }
    },

    getReadTimeValue(readTime: string): number {
      return parseInt(readTime)
    }
  }
})
</script>

<template>
  <div class="blog">
    <header class="blog-header">
      <div class="container">
        <h1>Coffee Blog</h1>
        <p class="subtitle">Stories, insights, and knowledge from the world of coffee</p>
      </div>
    </header>

    <main class="container">
      <div class="filter-window">
        <div class="filter-header">
          <h3>Filter & Sort Posts</h3>
          <button
            v-if="selectedCategories.length > 0"
            class="clear-btn"
            @click="clearFilters"
          >
            Clear Filters
          </button>
        </div>

        <div class="filter-section">
          <h4>Categories:</h4>
          <div class="filter-buttons">
            <button
              v-for="category in categories"
              :key="category"
              :class="['filter-btn', { active: selectedCategories.includes(category) }]"
              @click="toggleCategory(category)"
            >
              {{ category }}
            </button>
          </div>
        </div>

        <div class="sort-section">
          <h4>Sort by:</h4>
          <select v-model="sortBy" class="sort-select">
            <option value="dateDesc">Newest First</option>
            <option value="dateAsc">Oldest First</option>
            <option value="readTimeAsc">Shortest Read Time</option>
            <option value="readTimeDesc">Longest Read Time</option>
          </select>
        </div>

        <div class="filter-footer">
          Showing {{ filteredPosts.length }} of {{ blogPosts.length }} posts
        </div>
      </div>

      <section class="blog-grid">
        <BlogCard
          v-for="post in filteredPosts"
          :key="post.id"
          :post="post"
          @click="openPost(post)"
        />
      </section>
    </main>

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
