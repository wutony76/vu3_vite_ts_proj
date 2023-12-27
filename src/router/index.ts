import { createRouter, createWebHistory } from 'vue-router'
import HomeComponent from '@/views/Home.vue'
import SnakeGame from '@/views/SnakeGame.vue'
import SplittingView from '@/views/SplittingTest.vue'
import FloatingMenuView from '@/views/FloatingMenu.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeComponent },
  { path: '/snake', name: 'SnakeGame', component: SnakeGame },
  { path: '/splitting', name: 'SplittingPage', component: SplittingView },
  { path: '/floatingMenu', name: 'FloatingMenu', component: FloatingMenuView },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router