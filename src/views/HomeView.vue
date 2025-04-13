<script setup lang="ts">
import { NButton } from 'naive-ui'
import { motion } from "motion-v"
import {onMounted, ref} from "vue";
import axiosInstance from "@/utils/axios-interseptors.ts";
import {useAuthStore} from "@/stores/auth.ts";

const auth = useAuthStore();

const players = ref([])

onMounted(async () => {
  const response = await axiosInstance.get(`https://vue-auth-b48ce-default-rtdb.firebaseio.com/players.json`)
  players.value = response?.data
})
</script>

<template>
  <main>
    {{players}}
    <n-button>naive-ui</n-button>
    <motion.div
      class="box"
      :animate="{ rotate: 360 }"
      :transition="{ duration: 1 }"
    />
  </main>
</template>

<style>
.box {
  width: 100px;
  height: 100px;
  background-color: #0cdcf7;
  border-radius: 5px;
}
</style>
