<script setup lang="ts">
import IconMoon from '@/assets/icons/IconMoon.vue';
import IconSun from '@/assets/icons/IconSun.vue';
import { useAuthStore } from '@/stores/auth.ts';
import AuthWrapper from '@/wrapper/AuthWrapper.vue';
import {
  darkTheme,
  NConfigProvider,
  NDialogProvider,
  NFlex,
  NLoadingBarProvider,
  NMessageProvider,
  NModalProvider,
  NNotificationProvider,
} from 'naive-ui';

import { computed, ref, watch } from 'vue';

import { RouterView } from 'vue-router';

const theme = ref(null);

const auth = useAuthStore();

function checkUser() {
  const tokens = localStorage.getItem('firebaseToken');
  if (tokens) {
    const { token, refreshToken } = JSON.parse(tokens);
    auth.userInfo.token = token;
    auth.userInfo.refreshToken = refreshToken;
  }
}

const visibleIcon = computed(() => {
  return !theme.value ? IconMoon : IconSun;
});

watch(theme, (newTheme) => {
  if (newTheme) {
    document.documentElement.classList.add('dark');
  }
 else {
    document.documentElement.classList.remove('dark');
  }
});

checkUser();
</script>

<template>
	<n-flex justify="end">
		<div role="button" class="dark:bg-[#5081e2] block ml-0 bg-(--main-bg) m-3 p-1 rounded-full transition-colors duration-200 linear" @click="() => theme ? theme = null : theme = darkTheme">
			<component :is="visibleIcon" class=" w-8 h-8" />
		</div>
	</n-flex>
	<n-config-provider :theme="theme" class="w-full  justify-center items-center flex">
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
	</n-config-provider>
</template>

<style scoped>

</style>
