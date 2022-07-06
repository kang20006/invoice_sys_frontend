import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/bootstrap4-dark-blue/theme.css'       //theme
import 'primevue/resources/primevue.min.css'                 //core css
import 'primeicons/primeicons.css'                           //icons
import 'primeflex/primeflex.css';
import '@fortawesome/fontawesome-free/js/all'
import ToastService from 'primevue/toastservice';
createApp(App).use(PrimeVue).use(router).use(ToastService).mount('#app');






