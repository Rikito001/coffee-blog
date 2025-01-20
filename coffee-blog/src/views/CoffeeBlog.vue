<script lang="ts">
import { defineComponent } from 'vue'
import blogData from '@/data/blog-data.json'

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
        <article
          v-for="post in filteredPosts"
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

<style scoped>
/* Previous styles remain the same */

.sort-section {
  margin-bottom: 1.5rem;
}

.sort-section h4 {
  color: var(--coffee-dark);
  font-size: 1rem;
  margin-bottom: 0.75rem;
}

.sort-select {
  width: 100%;
  max-width: 200px;
  padding: 0.5rem;
  border: 2px solid var(--coffee-light);
  border-radius: 8px;
  background-color: white;
  color: var(--coffee-dark);
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.sort-select:hover {
  border-color: var(--coffee-medium);
}

.sort-select:focus {
  outline: none;
  border-color: var(--coffee-medium);
  box-shadow: 0 0 0 2px rgba(139, 69, 19, 0.1);
}

@media (max-width: 768px) {
  .sort-select {
    max-width: 100%;
  }
}

/* Rest of the previous styles remain the same */
.filter-window {
  background: white;
  border-radius: 12px;
  box-shadow: var(--shadow-md);
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.filter-header h3 {
  color: var(--coffee-dark);
  font-size: 1.2rem;
  margin: 0;
}

.filter-section {
  margin-bottom: 1.5rem;
}

.filter-section h4 {
  color: var(--coffee-dark);
  font-size: 1rem;
  margin-bottom: 0.75rem;
}

.filter-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.filter-btn {
  background: none;
  border: 2px solid var(--coffee-light);
  color: var(--coffee-dark);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.filter-btn:hover {
  border-color: var(--coffee-medium);
}

.filter-btn.active {
  background: var(--coffee-light);
  color: white;
  border-color: var(--coffee-light);
}

.clear-btn {
  background: none;
  border: 1px solid var(--coffee-medium);
  color: var(--coffee-medium);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.clear-btn:hover {
  background: var(--coffee-medium);
  color: white;
}

.filter-footer {
  color: var(--coffee-medium);
  font-size: 0.9rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .filter-window {
    padding: 1rem;
  }

  .filter-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .filter-btn {
    font-size: 0.8rem;
    padding: 0.4rem 0.8rem;
  }

  .filter-section {
    margin-bottom: 1rem;
  }
}
</style>
