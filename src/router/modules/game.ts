import GameLottery from '@/views/GameLottery.vue'
import GameSnake from '@/views/GameSnake.vue'
import GameRacing from '@/views/GameRacing.vue'

const SubRoutes = {
  sort: 13,
  path: '/game',
  name: 'Game',
  children: [
    { name: 'Snake', path: 'snake', meta: {}, component: GameSnake },
    { name: 'Racing', path: 'racing', meta: {}, component: GameRacing },
    { name: 'Lottery', path: 'lottery', meta: {}, component: GameLottery },
  ]
}
export default SubRoutes
