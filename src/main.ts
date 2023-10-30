import { createApp } from 'vue'

// import ElementPlus from 'element-plus'
import pinia from '@/stores/index'
import App from '@/App.vue'
import router from '@/router'
import { directive } from '@/directive/index'
import other from '@/utils/other'

import 'uno.css'
import '@unocss/reset/tailwind.css'
import '@/theme/index.scss'

const app = createApp(App)

directive(app)
other.elSvg(app)

app.use(pinia)
app.use(router)
// app.use(ElementPlus)

app.mount('#app')
