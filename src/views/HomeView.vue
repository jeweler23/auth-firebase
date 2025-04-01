<script setup lang="ts">
import { NButton } from 'naive-ui'
import { motion } from "motion-v"

</script>

<template>
  <main>
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
