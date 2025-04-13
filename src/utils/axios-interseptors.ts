import axios from "axios";
import router from "@/router/index.ts";
import {useAuthStore} from "@/stores/auth.ts";

const axiosInstance = axios.create()

axiosInstance.interceptors.request.use((config)=>{
  if (config.url.includes("signUp") || config.url.includes("signInWithPassword")) {
    return config;
  }
  const authStore = useAuthStore()
  config.params = {
    ...config.params,
    auth: authStore.userInfo.token,
  };
  return config;
})

axiosInstance.interceptors.response.use((res)=>{
return res;
}, async (error)=>{
  const authStore = useAuthStore()
  const originalRequest = error.config;

  if (error.response.status === 401 && !originalRequest._retry) {

    originalRequest._retry = true;
    try {
      const tokens = await axiosInstance.post(`https://securetoken.googleapis.com/v1/token?key=${import.meta.env.VITE_API_KEY}`,{
        grant_type: "refresh_token",
        refresh_token: JSON.parse(localStorage.getItem("firebaseToken")).refreshToken,
      })
      authStore.userInfo.token = tokens.data.access_token
      authStore.userInfo.refreshToken = tokens.data.refresh_token
      localStorage.setItem('firebaseToken', JSON.stringify({
        token:tokens.data.access_token,
        refreshToken:tokens.data.refresh_token,
      }))
      originalRequest.params = {
        ...originalRequest.params,
        auth: authStore.userInfo.token,
      };
      return axiosInstance(originalRequest);
    } catch (e) {
      console.log(e)
      localStorage.removeItem('firebaseToken')
      await router.push('/signin')
      authStore.userInfo.token = ''
      authStore.userInfo.refreshToken = ''
    }
  }
})

export default axiosInstance
