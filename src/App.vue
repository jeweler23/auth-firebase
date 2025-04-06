<script setup lang="ts">
import { RouterView } from 'vue-router'
import {NMessageProvider,NDialogProvider,NModalProvider,NNotificationProvider,NLoadingBarProvider } from 'naive-ui'
import AuthWrapper from "@/wrapper/AuthWrapper.vue";



</script>

<template>
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
