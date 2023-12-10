<script setup lang="ts">
import { updateTaskFormModal } from "@/helpers/commonFunctions";
</script>

<template>
  <div class="bg-black bg-opacity-80 dialog-wrapper flex items-center justify-center min-h-screen">
    <div class="relative dialog-content border-2 border-white p-8 rounded-2xl shadow-lg w-1/2">
      <div class="text-2xl absolute right-4 top-4"><font-awesome-icon @click="updateTaskFormModal({isActive: false, isEditing: false})" class="cursor-pointer hover:scale-125" icon="fa-solid fa-xmark" /></div>
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dialog-content {
  background-color: var(--color-background);
}
</style>
