<script lang="ts">
import { defineComponent } from 'vue'

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
      blogPosts: [
        {
          id: 1,
          title: 'The Journey of Coffee: From Bean to Cup',
          date: 'January 15, 2025',
          author: 'Maria Santos',
          excerpt: 'Discover the fascinating journey your coffee makes...',
          category: 'Education',
          readTime: '5 min read',
          fullContent: `The journey of coffee from bean to cup is an intricate process that spans continents and requires careful attention at every step. It begins in the fertile soils of the coffee belt, where farmers carefully tend to their coffee plants, waiting for the perfect moment to harvest the bright red coffee cherries.

Each bean is handpicked at peak ripeness, then undergoes a careful processing method - whether it's the traditional washed process, the natural process, or the honey process. These methods significantly influence the final flavor of your cup.

The beans then begin their global journey, shipped to roasters who apply their expertise to bring out the best flavors through careful roasting profiles. Finally, they reach your local café or home, ready to be ground and brewed into the perfect cup.`
        },
        {
          id: 2,
          title: 'Understanding Coffee Roast Profiles',
          date: 'January 18, 2025',
          author: 'James Chen',
          excerpt: 'Learn how different roast levels affect your coffee...',
          category: 'Roasting',
          readTime: '4 min read',
          fullContent: `Coffee roasting is both an art and a science. The roast level you choose can dramatically affect the flavor of your coffee. Light roasts preserve the bean's original character, highlighting bright, acidic notes and complex flavors. Medium roasts balance these characteristics with deeper, sweeter notes developed during the roasting process.

Dark roasts bring out bold, intense flavors with notes of chocolate and caramel, though they may mask some of the bean's original characteristics. Understanding these profiles helps you choose the perfect roast for your taste preferences.`
        },
        {
          id: 3,
          title: 'Sustainable Coffee: Making Better Choices',
          date: 'January 20, 2025',
          author: 'Emma Green',
          excerpt: 'How your coffee choices impact the environment...',
          category: 'Sustainability',
          readTime: '6 min read',
          fullContent: `Sustainable coffee production is becoming increasingly important as we face environmental challenges. From shade-grown coffee that preserves bird habitats to fair trade practices that ensure farmers receive fair compensation, every choice we make as consumers affects the coffee industry's sustainability.

Learn about certification programs, ethical sourcing, and how your daily coffee routine can contribute to a more sustainable future for coffee farming communities and our planet.`
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
  <div class="blog">
    <header class="blog-header">
      <div class="container">
        <h1>Coffee Blog</h1>
        <p class="subtitle">Stories, insights, and knowledge from the world of coffee</p>
      </div>
    </header>

    <main class="container">
      <section class="blog-grid">
        <article
          v-for="post in blogPosts"
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
