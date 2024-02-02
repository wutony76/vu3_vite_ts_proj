import { createRouter, createWebHistory } from 'vue-router'
import HomeComponent from '@/views/Home.vue'
import GameSnake from '@/views/GameSnake.vue'
import GameRacing from '@/views/GameRacing.vue'
import GameLobby from '@/views/GameLobby.vue'
import SplittingView from '@/views/SplittingTest.vue'
import FloatingMenuView from '@/views/FloatingMenu.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeComponent },
  { path: '/lobby', name: 'GameLobby', component: GameLobby },
  { path: '/snake', name: 'GameSnake', component: GameSnake },
  { path: '/racing', name: 'GameRacing', component: GameRacing },
  { path: '/splitting', name: 'SplittingPage', component: SplittingView },
  { path: '/floatingMenu', name: 'FloatingMenu', component: FloatingMenuView },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router