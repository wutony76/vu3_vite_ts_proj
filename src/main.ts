import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import './style.css'
// import './assets/css/style.css'

const app = createApp(App)
app.use(router)
// createApp(App).mount('#app')
app.mount('#app')