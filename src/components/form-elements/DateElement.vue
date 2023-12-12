<template>
  <input
    :value="modelValue"
    class="dark:[color-scheme:dark] bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
    min="1899-01-01"
    max="2199-12-31"
    type="date"
    required
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value)"
  />
</template>

<script setup lang="ts">
type Props = {
  modelValue: string
}

defineEmits(['update:modelValue'])
defineProps<Props>()
</script>

<style scoped>

</style>
