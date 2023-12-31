<script setup lang="ts">
import { useTasksStore } from "@/stores/tasks";
import { updateTaskFormModal } from "@/helpers/commonFunctions";
import {onMounted, ref, watch} from "vue";
import type { SingleTask } from "@/types/tasksStoreTypes";

const tasksStore = useTasksStore();
const taskListHeaders = ['Name', 'Description', 'Due Date', 'Actions'];
const taskList = ref(tasksStore.taskList);

onMounted(() => {
  try {
    const locallySavedTasks = localStorage.getItem('taskList')

    if (locallySavedTasks) {
      tasksStore.taskList.splice(0, tasksStore.taskList.length);
      const savedTasks = JSON.parse(locallySavedTasks);

      savedTasks.forEach((value: any) => {
        const task = {...value} as SingleTask;
        if(!task.name || !task.description || !task.dueDate){
          console.error("Stored task does not have required keys");
        } else {
          tasksStore.addNewTask(task)
        }
      });
    }
  } catch (error) {
    console.error("Error loading tasks from local storage", error);
  }
})

/**
 * Calls the store function to delete the task
 * @param id - contains the id of the task to be deleted
 */
function deleteTask(id: number) {
  tasksStore.deleteTask(id)
}

/**
 * Calls the store function to edit a task
 * @param id - contains the id of the task to be edited
 */
function editTask(id: number) {
  updateTaskFormModal({isActive: true, isEditing: true, idToEdit: id})
}

//Watch changes in the task list within the store. When those occur update your local storage with the entire new list
watch(tasksStore.taskList, async () => {
  localStorage.setItem('taskList', JSON.stringify(tasksStore.taskList))
});
</script>

<template>
  <button
    v-if="taskList.length > 0"
    class="button-primary float-right mb-4"
    @click="updateTaskFormModal({isActive: true, isEditing: false})"
  >
    Add Task
  </button>
    <table v-if="taskList.length > 0" class="table-fixed min-w-full divide-y divide-gray-200">
      <thead>
        <tr >
          <th
            v-for="header in taskListHeaders"
            :key="header"
            scope="col"
            class="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider"
          >
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody class="divide-y">
        <tr v-for="task in taskList" :key="task.id" class="bg-gray-100 even:bg-gray-200 hover:bg-gray-300 dark:even:bg-gray-700 dark:bg-gray-800 dark:hover:bg-gray-900">
          <td class="px-6 py-4 w-1/4">
            {{ task.name }}
          </td>
          <td class="px-6 py-4 w-1/2">
            {{ task.description }}
          </td>
          <td class="px-6 py-4 w-1/6">
            {{ task.dueDate }}
          </td>
          <td
            class="w-1/10 px6 py-4 cursor-pointer text-center">
            <font-awesome-icon
              class="hover:scale-125 mr-2"
              icon="fa-solid fa-pen-to-square"
              @click="task.id !== undefined ? editTask(task.id) : undefined"
            />
            <font-awesome-icon
              class="hover:scale-125 ml-2"
              icon="fa-solid fa-trash"
              @click="task.id !== undefined ? deleteTask(task.id) : undefined"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="taskList.length === 0" class="w-full text-center">
      <h2 class="text-2xl">No tasks yet, add one!</h2>
      <button
        class="button-primary text-center mb-4"
        @click="updateTaskFormModal({isActive: true, isEditing: false})"
      >
        Add Task
      </button>
    </div>

</template>

<style scoped lang="scss">
</style>
