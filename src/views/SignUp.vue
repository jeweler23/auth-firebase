<template>
<h1 >SignUp</h1>
<n-form ref="formRef" :model="modelRef" :rules="rules">
<n-form-item path="email" label="Email" >
  <n-icon size="32">
    <UserAvatar />
  </n-icon>
  <n-input  v-model:value="modelRef.email" @keydown.enter.prevent />
</n-form-item>
<n-form-item path="password" label="Password">
  <n-icon size="32">
    <Password />
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
  <n-icon size="32">
    <Password />
  </n-icon>
  <n-input
    v-model:value="modelRef.reenteredPassword"
    :disabled="!modelRef.password"
    type="password"
    @keydown.enter.prevent
  />
</n-form-item>
<n-row :gutter="[0, 24]">
  <n-col :span="24">
    <div style="display: flex; justify-content: flex-end">
      <n-button
        :disabled="modelRef.age === null"
        round
        type="primary"
        @click="handleValidateButtonClick"
      >
        SignUp
      </n-button>
    </div>
  </n-col>
</n-row>
</n-form>

<pre>{{ JSON.stringify(modelRef, null, 2) }}
</pre>
</template>

<script lang="ts" setup>
import type {
  FormInst,
  FormItemInst,
  FormItemRule,
  FormRules,
  FormValidationError
} from 'naive-ui'
import { useMessage } from 'naive-ui'
import {  ref } from 'vue'
import {NInput,NFormItem,NButton,NCol,NRow,NForm,NIcon} from 'naive-ui'
import {UserAvatar,Password} from '@vicons/carbon'
import {type ModelType} from "@/types";
import {useAuthStore} from "@/stores/auth.ts";
import {useRouter} from "vue-router";

const authStore = useAuthStore()
const router = useRouter()

const formRef = ref<FormInst | null>(null)
const rPasswordFormItemRef = ref<FormItemInst | null>(null)
const message = useMessage()
const modelRef = ref<ModelType>({
  email: null,
  password: null,
  reenteredPassword: null
})
function validatePasswordStartWith(
  rule: FormItemRule,
  value: string
): boolean {
  return (
    !!modelRef.value.password
        && modelRef.value.password.startsWith(value)
        && modelRef.value.password.length >= value.length
  )
}

function validatePasswordSame(rule: FormItemRule, value: string): boolean {
  return value === modelRef.value.password
}
const rules: FormRules = {
  email: [
    {
      required: true,
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error('Age is required')
        }

        else if (value.length < 5) {
          return new Error('Email length should be above 5')
        }
        return true
      },
      trigger: ['input', 'blur']
    }
  ],
  password: [
    {
      required: true,
      validator(rule: FormItemRule, value: string) {
        if (!value.length) {
          return new Error('Password is required')
        }

        else if (value.length < 6) {
          return new Error('Password length should be above 6')
        }

        if (modelRef.value.reenteredPassword) {
          rPasswordFormItemRef.value?.validate({ trigger: 'password-input' })
        }
        return true
      },
      trigger: ['input', 'blur'],
    }
  ],
  reenteredPassword: [
    {
      required: true,
      message: 'Re-entered password is required',
      trigger: ['input', 'blur']
    },
    {
      validator: validatePasswordStartWith,
      message: 'Password is not same as re-entered password!',
      trigger: 'input'
    },
    {
      validator: validatePasswordSame,
      message: 'Password is not same as re-entered password!',
      trigger: ['blur', 'password-input']
    }
  ]
}

const  handleValidateButtonClick = async (e: MouseEvent)=> {
  e.preventDefault()
  formRef.value?.validate(
    (errors: Array<FormValidationError> | undefined) => {
      if (!errors) {
        message.success('Valid')
      }
      else {
        console.log(errors)
        message.error('Invalid')
      }
    }
  )
  const {email, password} = modelRef.value
  const user = await authStore.auth({ email, password },'signUp' )
  if (user?.token) {
    await router.push('/signin')
  }
  console.log(user)
}

</script>
