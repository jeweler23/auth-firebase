<script setup lang="ts">
import { RouterView } from 'vue-router'
import {NMessageProvider,NDialogProvider,NModalProvider,NNotificationProvider,NLoadingBarProvider } from 'naive-ui'
import AuthWrapper from "@/wrapper/AuthWrapper.vue";


import { toast, type ToastOptions } from 'vue3-toastify';

const notify = () => {
  toast("Wow so easy !", {
    autoClose: 1000,
    position: toast.POSITION.BOTTOM_RIGHT,
  } as ToastOptions);
}
</script>

<template>
  <button @click="notify">Notify !</button>

  <n-loading-bar-provider>
    <n-message-provider>
      <n-notification-provider>
        <n-modal-provider>
          <n-dialog-provider>
            <router-view v-slot="{ Component }">
              <AuthWrapper>
                <component :is="Component" />
              </AuthWrapper>
            </router-view>
          </n-dialog-provider>
        </n-modal-provider>
      </n-notification-provider>
    </n-message-provider>
  </n-loading-bar-provider>
</template>

<style scoped>

</style>
