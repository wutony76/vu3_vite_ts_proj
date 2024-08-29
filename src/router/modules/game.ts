
const SubRoutes = {
  sort: 13,
  path: '/game',
  name: 'game',
  children: [
    {
      path: 'lottery',
      // hidden: true,
      meta: {
        // title: '彩种列表',
      },
      component: () => import('@/views/GameLottery.vue'),
      name: 'Lottery',
    },
  ]
}
export default SubRoutes
