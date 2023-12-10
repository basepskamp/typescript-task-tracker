<script setup lang="ts">
import InputElement from "@/components/form-elements/InputElement.vue";
import LabelElement from "@/components/form-elements/LabelElement.vue";
import TextareaElement from "@/components/form-elements/TextareaElement.vue";
import { onMounted, ref } from "vue";

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  inputType: {
    type: String,
    required: false
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
    required: false
  }
})

const inputValue = props.initialData ? ref(props.initialData) : ref('')

//on mounted we immediately emit to make sure the input value is in sync when it's prefilled
onMounted(() => {
  emit('update:modelValue', inputValue.value);
});
</script>

<template>
  <div>
    <LabelElement> {{labelTitle}} </LabelElement>
    <InputElement
      v-if="element === 'input'"
      v-model="inputValue"
      placeholder="Task Name"
      :type="(inputType) ? inputType : 'text'"
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
