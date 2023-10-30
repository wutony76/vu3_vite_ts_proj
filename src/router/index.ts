import { createRouter, createWebHistory } from 'vue-router'
import HomeComponent from '@/views/Home.vue'
import SnakeGame from '@/views/SnakeGame.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeComponent },
  { path: '/snake', name: 'SnakeGame', component: SnakeGame },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router