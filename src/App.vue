<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.ts';
import AuthWrapper from '@/wrapper/AuthWrapper.vue';
import { NDialogProvider, NLoadingBarProvider, NMessageProvider, NModalProvider, NNotificationProvider } from 'naive-ui';

import { RouterView } from 'vue-router';

const auth = useAuthStore();

function checkUser() {
  const tokens = localStorage.getItem('firebaseToken');
  if (tokens) {
    const { token, refreshToken } = JSON.parse(tokens);
    auth.userInfo.token = token;
    auth.userInfo.refreshToken = refreshToken;
  }
}

checkUser();
</script>

<template>
	<n-loading-bar-provider>
		<n-message-provider>
			<n-notification-provider>
				<n-modal-provider>
					<n-dialog-provider>
						<router-view v-slot="{ Component }">
							<auth-wrapper>
								<component :is="Component" />
							</auth-wrapper>
						</router-view>
					</n-dialog-provider>
				</n-modal-provider>
			</n-notification-provider>
		</n-message-provider>
	</n-loading-bar-provider>
</template>

<style scoped>

</style>
