import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { type CredentialsUser} from '@/types'
import { message } from '@/utils/naive-ui-discrete-api.ts'


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
      const response:IUserDTO = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:${type}?key=${import.meta.env.VITE_API_KEY}`, {
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
      message.success(
        'Cause you walked hand in hand With another man in my place'
      )
      return userInfo.value
    }catch(error){
      console.log(error)
    }
  }
  return { auth }
})
