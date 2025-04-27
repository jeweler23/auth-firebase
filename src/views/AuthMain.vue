<template>
	<n-card>
		<n-tabs
			:default-value="authType.toLowerCase()"
			size="large"
			animated
			type="segment"
		>
			<n-tab-pane name="signin" tab="Sign in">
				<sign-in />
			</n-tab-pane>
			<n-tab-pane name="signup" tab="Sign up">
				<sign-up />
			</n-tab-pane>
		</n-tabs>
	</n-card>
</template>

<script setup lang="ts">
import SignIn from '@/components/SignIn.vue';
import SignUp from '@/components/SignUp.vue';
import { NCard, NTabPane, NTabs } from 'naive-ui';

const { authType = 'signin' } = defineProps<{ authType?: string }>();
</script>
