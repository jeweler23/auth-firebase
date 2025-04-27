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
		<n-form-item
			ref="rPasswordFormItemRef"
			first
			path="reenteredPassword"
			label="Re-enter Password"
		>
			<n-icon size="24">
				<password />
			</n-icon>
			<n-input
				v-model:value="modelRef.reenteredPassword"
				:disabled="!modelRef.password"
				type="password"
				@keydown.enter.prevent
			/>
		</n-form-item>
	</n-form>
	<n-button
		:disabled="!modelRef.password && !modelRef.reenteredPassword && !modelRef.email"
		round
		block secondary strong
		type="primary"
		@click.prevent="handleValidateButtonClick"
	>
		SignUp
	</n-button>
</template>

<script lang="ts" setup>
import type { ModelType } from '@/types';
import type {
  FormInst,
  FormItemInst,
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
const rPasswordFormItemRef = ref<FormItemInst | null>(null);

const modelRef = ref<ModelType>({
  email: null,
  password: null,
  reenteredPassword: null,
});
function validatePasswordStartWith(
  rule: FormItemRule,
  value: string,
): boolean {
  return (
    !!modelRef.value.password
    && modelRef.value.password.startsWith(value)
    && modelRef.value.password.length >= value.length
  );
}

function validatePasswordSame(rule: FormItemRule, value: string): boolean {
  return value === modelRef.value.password;
}
const rules: FormRules = {
  email: [
    {
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error('Email is required');
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
      validator(rule: FormItemRule, value: string) {
        if (!value.length) {
          return new Error('Password is required');
        }

        else if (value.length < 6) {
          return new Error('Password length should be above 6');
        }

        if (modelRef.value.reenteredPassword) {
          rPasswordFormItemRef.value?.validate({ trigger: 'password-input' });
        }
        return true;
      },
      trigger: ['input', 'blur'],
    },
  ],
  reenteredPassword: [
    {
      message: 'Re-entered password is required',
      trigger: ['input', 'blur'],
    },
    {
      validator: validatePasswordStartWith,
      message: 'Password is not same as re-entered password!',
      trigger: 'input',
    },
    {
      validator: validatePasswordSame,
      message: 'Password is not same as re-entered password!',
      trigger: ['blur', 'password-input'],
    },
  ],
};

async function handleValidateButtonClick() {
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
  const user = await authStore.auth({ email, password }, 'signUp');
  if (user?.token) {
    await router.push('/players');
  }
}
</script>
