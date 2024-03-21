import { createApp } from 'vue'
import './style.css'
import router from './router';
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import '@popperjs/core/dist/umd/popper.min.js';

import App from './App.vue'

// createApp(App).mount('#app')
createApp(App).use(router).mount('#app');
