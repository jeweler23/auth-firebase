import type { CredentialsUser } from '@/types';

import type { ToastOptions } from 'vue3-toastify';
import axiosInstance from '@/utils/axios-interseptors.ts';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { toast } from 'vue3-toastify';

interface IUserDTO {
  token: string;
  email: string;
  userId: string;
  refreshToken: string;
  expiresIn: string;
}

interface IUserResponseDTO extends IUserDTO {
  idToken: string;
  localId: string;

}

export const useAuthStore = defineStore('auth', () => {
  const userInfo = ref<IUserDTO>({
    token: '',
    email: '',
    userId: '',
    refreshToken: '',
    expiresIn: '',
  });

  const auth = async (payload: CredentialsUser, type: 'signUp' | 'signInWithPassword'): Promise<IUserDTO | undefined> => {
    try {
      const { data } = await axiosInstance.post<IUserResponseDTO>(`https://identitytoolkit.googleapis.com/v1/accounts:${type}?key=${import.meta.env.VITE_API_KEY}`, {
        ...payload,
        returnSecureToken: true,
      });
      userInfo.value = {
        token: data.idToken,
        email: data.email,
        userId: data.localId,
        refreshToken: data.refreshToken,
        expiresIn: data.expiresIn,
      };

      localStorage.setItem('firebaseToken', JSON.stringify({
        token: userInfo.value.token,
        refreshToken: userInfo.value.refreshToken,
      }));
      toast.success('Успех', {
        autoClose: 1000,
        position: toast.POSITION.BOTTOM_RIGHT,
      } as ToastOptions);
      return userInfo.value;
    }
catch {
      toast.error('Неудачно', {
        autoClose: 1000,
        position: toast.POSITION.BOTTOM_RIGHT,
      } as ToastOptions);
    }
  };
  return { auth, userInfo };
});
