import { createRouter, createWebHistory } from 'vue-router'
import HomeComponent from '@/views/Home.vue'
// import GameSnake from '@/views/GameSnake.vue'
// import GameRacing from '@/views/GameRacing.vue'

import GameLobby from '@/views/GameLobby.vue'
import SplittingView from '@/views/SplittingTest.vue'
import FloatingMenuView from '@/views/FloatingMenu.vue'

// const files = require.context('./modules/sn', false, /\.js$/) // v2
function getAllRoutes(routes:any):void {
  const files: any = import.meta.glob('./modules/*.ts', { eager: true })
  Object.keys(files).forEach((file: string) => {
    console.log('R.', file, typeof file, files[file].default)
    if (!files[file]?.default) return
    const dictFile: any = files[file].default
    const parentUrl: String = dictFile.path 
    dictFile.children.forEach((sub: any) => {
      const _path:String = `${parentUrl}/${sub.path}`
      routes.push({path: _path, name: sub.name, component: sub.component})
    })
  })
}

const routes: any = [
  { path: '/', name: 'Home', component: HomeComponent },
  { path: '/lobby', name: 'Lobby', component: GameLobby },
  // { path: '/snake', name: 'GameSnake', component: GameSnake }, // 貪吃蛇
  // { path: '/racing', name: 'GameRacing', component: GameRacing },
  // { path: '/lottery', name: 'GameLottery', component: GameLottery },
  { path: '/splitting', name: 'SplittingPage', component: SplittingView },
  { path: '/floatingMenu', name: 'FloatingMenu', component: FloatingMenuView },
]
getAllRoutes(routes)

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router