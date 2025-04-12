import axios from "axios";
import {useRouter} from "vue-router";

import {useAuthStore} from "@/stores/auth.ts";

const axiosInstance = axios.create()

axiosInstance.interceptors.request.use((config)=>{
  if (config.url.includes("signUp") || config.url.includes("signInWithPassword")) {
    return config;
  }
  const authStore = useAuthStore()
  const params = new URLSearchParams()
  params.append('auth',authStore.userInfo.token)
  config.params = params
  return config;
})

axiosInstance.interceptors.response.use((res)=>{
return res;
}, async (error)=>{
  const router = useRouter();
  const authStore = useAuthStore()

  if (error.response.status === 401 && error.config._retry) {
    error.config._retry = true;
    try {
      const tokens = await axiosInstance.post(`https://securetpken.googleapis.com/v1/token?key=${import.meta.env.VITE_API_KEY}`,{
        grant_type: "refresh_token",
        refresh_token: JSON.parse(localStorage.getItem("firebaseToken")).refreshToken,
      })
authStore.userInfo.token = tokens.data.access_token
      authStore.userInfo.refreshToken = tokens.data.refresh_token
      localStorage.setItem('firebaseToken', JSON.stringify({
        token:tokens.data.access_token,
        refreshToken:tokens.data.refresh_token,
      }))
    } catch (e) {
      console.log(e)
      localStorage.removeItem('firebaseToken')
      router.push('/signin')
      authStore.userInfo.token = ''
      authStore.userInfo.refreshToken = ''
    }
  }
})

export default axiosInstance
