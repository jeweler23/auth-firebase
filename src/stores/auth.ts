import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { type CredentialsUser} from '@/types'

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

  const signUp = async (payload:CredentialsUser): Promise<void> => {
    try{
      const response:IUserDTO = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${import.meta.env.VITE_API_KEY}`, {
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
    if (response.response.status === 400) {

    }
      console.log(response.response.status)
    }catch(error){
      console.log(error)
    }
  }
  return {signUp}
})
