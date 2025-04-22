import { useAuthStore } from '@/stores/auth.ts';

import axios from 'axios';

axios.interceptors.request.use((config) => {
  const authStore = useAuthStore();
  const params = new URLSearchParams();
  params.append('auth', authStore.userInfo.token);
  config.params = params;
  return config;
});
