import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';


import App from './App.vue'
import router from './router'

import {naive} from '@/plugins/naiveui.ts'

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY as string,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN as string,
  projectId: import.meta.env.VITE_PROJECT_ID as string,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET as string,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID as string,
  appId: import.meta.env.VITE_APP_ID as string,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID as string,
  databaseURL: import.meta.env.VITE_DATABASE_URL as string,
};

initializeApp(firebaseConfig);

const app = createApp(App)


app.use(createPinia())
app.use(router)
app.use(naive)
app.use(Vue3Toastify)

app.mount('#app')
