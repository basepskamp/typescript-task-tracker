<script setup lang="ts">
import { ref } from "vue";
import InputElement from "@/components/form-elements/InputElement.vue";
import LabelElement from "@/components/form-elements/LabelElement.vue";
import TextareaElement from "@/components/form-elements/TextareaElement.vue";
import DateElement from "@/components/form-elements/DateElement.vue";

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  inputType: {
    type: String,
    required: false,
    default: 'text'
  },
  element: {
    type: String,
    required: true
  },
  labelTitle: {
    type: String,
    required: true
  },
  initialData: {
    type: String,
    required: false,
    default: ''
  }
})

const inputValue = props.initialData ? ref(props.initialData) : ref('')
</script>

<template>
  <div>
    <LabelElement> {{ labelTitle }} </LabelElement>
    <InputElement
      v-if="element === 'inputText'"
      v-model="inputValue"
      placeholder="Task Name"
      required
      @change="emit('update:modelValue', inputValue)"
    />
    <DateElement
      v-if="element === 'inputDate'"
      v-model="inputValue"
      required
      @change="emit('update:modelValue', inputValue)"
    />
    <TextareaElement
      v-if="element === 'textarea'"
      v-model="inputValue"
      placeholder="Task Name"
      required
      @change="emit('update:modelValue', inputValue)"
    />
  </div>
</template>

<style scoped>

</style>
