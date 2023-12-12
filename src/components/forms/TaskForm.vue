<script setup lang="ts">
import {onMounted, ref} from "vue";
import { useTasksStore } from "@/stores/tasks";
import { updateTaskFormModal } from "@/helpers/commonFunctions";
import FormInput from "@/components/form-elements/FormInput.vue";
import DialogComponent from "@/components/ui/DialogComponent.vue";

const tasksStore = useTasksStore();

const taskName = ref<string>('');
const taskDescription = ref<string>('');
const taskDueDate = ref<string>('');

const isInitialized = ref(false);

const initializeForm = () => {
  // Check if the isEditing is true and that the idToEdit is present in the store is set
  if (tasksStore.taskFormModal.isEditing && tasksStore.taskFormModal.idToEdit ) {
    // Set the form field based on the store value
    const indexToFind = tasksStore.findSingleTaskIndex(tasksStore.taskFormModal.idToEdit);

    // Ensure that the taskList[indexToFind] is not undefined before accessing its properties
    if (tasksStore.taskList[indexToFind]) {
      taskName.value = tasksStore.taskList[indexToFind].name;
      taskDescription.value = tasksStore.taskList[indexToFind].description;
      taskDueDate.value = tasksStore.taskList[indexToFind].dueDate;
    }
  }
  isInitialized.value = true;
};

onMounted(() => {
  initializeForm();
})

/**
 * Saves task data to the store based on the editing state of the task form modal.
 * If the modal is in editing mode, updates an existing task. Otherwise, adds a new task.
 * Resets the task form modal state after saving.
 *
 * @function
 */
function saveTaskData() {
  if (tasksStore.taskFormModal.isEditing) {
    tasksStore.editTask({
      name: taskName.value,
      description: taskDescription.value,
      dueDate: taskDueDate.value,
      id: tasksStore.taskFormModal.idToEdit
    })
  } else {
    tasksStore.addNewTask({
      name: taskName.value,
      description: taskDescription.value,
      dueDate: taskDueDate.value
    })
  }

  updateTaskFormModal({
    isActive: false,
    isEditing: false
  })
}
</script>

<template>
  <div
    class="fixed inset-0 overflow-y-auto"
  >
    <form @submit.prevent="saveTaskData">
      <DialogComponent>
        <h2 class="mb-10 text-2xl font-bold">
          {{ tasksStore.taskFormModal.isEditing ? 'Edit' : 'Create' }} Task
        </h2>
        <FormInput
          v-if="isInitialized"
          v-model="taskName"
          element="inputText"
          label-title="Task Name"
          :initial-data="taskName"
          class="mb-6"
        />

        <FormInput
          v-if="isInitialized"
          v-model="taskDescription"
          element="textarea"
          label-title="Description"
          :initial-data="taskDescription"
          class="mb-6"
        />

        <FormInput
          v-if="isInitialized"
          v-model="taskDueDate"
          element="inputDate"
          label-title="Due date"
          :initial-data="taskDueDate"
          class="mb-6"
        />

        <button
          class="button-primary float-right"
          type="submit"
        >
          Save
        </button>
      </DialogComponent>
    </form>
  </div>
</template>

<style scoped>

</style>
