import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import vue3GoogleLogin from 'vue3-google-login'

const app = createApp(App)

app.use(vue3GoogleLogin, {
  clientId: '463402777513-skhs1og4clv62qr04dk64icgms5keql6.apps.googleusercontent.com'
})


createApp(App).mount('#app')
