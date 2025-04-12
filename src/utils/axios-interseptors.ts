import axios from "axios";

import {useAuthStore} from "@/stores/auth.ts";

axios.interceptors.request.use((config)=>{
  if (config.url.includes("signUp") || config.url.includes("signInWithPassword")) {
    return config;
  }
  const authStore = useAuthStore()
  const params = new URLSearchParams()
  params.append('auth',authStore.userInfo.token)
  config.params = params
  return config;
})
