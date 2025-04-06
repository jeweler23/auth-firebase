<template>
  <slot/>
</template>
<script setup lang="ts">

import {useMessage } from 'naive-ui'

import { provide } from 'vue'

const message = useMessage()
provide('message', message)

</script>
