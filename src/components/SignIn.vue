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
import type { ToastOptions } from 'vue3-toastify';
import { useAuthStore } from '@/stores/auth.ts';
import { Password, UserAvatar } from '@vicons/carbon';
import { NButton, NForm, NFormItem, NIcon, NInput } from 'naive-ui';
import { ref } from 'vue';
import { toast } from 'vue3-toastify';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const formRef = ref<FormInst | null>(null);
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
      toast.success('Успех', {
        autoClose: 1000,
        position: toast.POSITION.BOTTOM_RIGHT,
      } as ToastOptions);
      }
      else {
        toast.error('Ошибка', {
          autoClose: 1000,
          position: toast.POSITION.BOTTOM_RIGHT,
        } as ToastOptions);
      }
    },
  );
  const { email, password } = modelRef.value;
  const user = await authStore.auth({ email, password }, 'signInWithPassword');
  if (user?.token)
    await router.push('/players');
}
</script>
