<template>
	<n-form ref="formRef" :model="modelRef" :rules="rules">
		<n-form-item path="email" label="Email">
			<n-icon size="24">
				<user-avatar />
			</n-icon>
			<n-input v-model:value="modelRef.email" @keydown.enter.prevent />
		</n-form-item>
		<n-form-item path="password" label="Password">
			<n-icon size="24">
				<password />
			</n-icon>
			<n-input
				v-model:value="modelRef.password"
				type="password"

				@keydown.enter.prevent
			/>
		</n-form-item>

		<n-button
			:disabled="!modelRef.email || !modelRef.password"
			round block secondary strong

			type="primary"
			@click="handleValidateButtonClick"
		>
			SignIn
		</n-button>
	</n-form>
</template>

<script lang="ts" setup>
import type { CredentialsUser } from '@/types';
import type {
  FormInst,
  FormItemRule,
  FormRules,
  FormValidationError,
} from 'naive-ui';
import { useAuthStore } from '@/stores/auth.ts';
import { Password, UserAvatar } from '@vicons/carbon';
import { NButton, NForm, NFormItem, NIcon, NInput, useMessage } from 'naive-ui';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const formRef = ref<FormInst | null>(null);
const message = useMessage();
const modelRef = ref<CredentialsUser>({
  email: null,
  password: null,
});

const rules: FormRules = {
  email: [
    {

      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error('Age is required');
        }

        else if (value.length < 5) {
          return new Error('Email length should be above 5');
        }
        return true;
      },
      trigger: ['input', 'blur'],
    },
  ],
  password: [
    {

      message: 'Password is required',
    },
  ],
};

async function handleValidateButtonClick(e: MouseEvent) {
  e.preventDefault();
  formRef.value?.validate(
    (errors: Array<FormValidationError> | undefined) => {
      if (!errors) {
        message.success('Valid');
      }
      else {
        console.log(errors);
        message.error('Invalid');
      }
    },
  );
  const { email, password } = modelRef.value;
  const user = await authStore.auth({ email, password }, 'signInWithPassword');
  if (user?.token)
    await router.push('/players');
}
</script>
