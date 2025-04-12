import { ref,inject } from 'vue'
import { defineStore } from 'pinia'
import { type CredentialsUser} from '@/types'
import { toast, type ToastOptions } from 'vue3-toastify';
import axiosInstance from "@/utils/axios-interseptors.ts";

interface IUserDTO {
  token: string,
  email: string,
  userId: string,
  refreshToken: string,
  expiresIn: string,
}


export const useAuthStore = defineStore('auth', () => {

  const userInfo = ref<IUserDTO>({
    token: null,
    email: null,
    userId: null,
    refreshToken: null,
    expiresIn: null,
  })

  const auth = async (payload:CredentialsUser,type:'signUp'|'signInWithPassword'): Promise<void> => {

    try{
      const response:IUserDTO = await axiosInstance.post(`https://identitytoolkit.googleapis.com/v1/accounts:${type}?key=${import.meta.env.VITE_API_KEY}`, {
        ...payload,
        returnSecureToken:true
      })
      userInfo.value = {
        token: response.data.idToken,
        email: response.data.email,
        userId: response.data.localId,
        refreshToken: response.data.refreshToken,
        expiresIn: response.data.expiresIn,
      }

      localStorage.setItem('firebaseToken', JSON.stringify({
        token:userInfo.value.token,
        refreshToken:userInfo.value.refreshToken,
      }))
      toast.success("Успех", {
        autoClose: 1000,
        position: toast.POSITION.BOTTOM_RIGHT,
      } as ToastOptions);
      return userInfo.value
    }catch {
      toast.error("Неудачно", {
        autoClose: 1000,
        position: toast.POSITION.BOTTOM_RIGHT,
      } as ToastOptions);
    }
  }
  return { auth,userInfo }
})
