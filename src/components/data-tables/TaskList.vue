<script setup lang="ts">
import { useTasksStore } from "@/stores/tasks";
import { updateTaskFormModal } from "@/helpers/commonFunctions";
import {onMounted, ref, watch} from "vue";
import type { SingleTask } from "@/types/tasksStoreTypes";

const tasksStore = useTasksStore();
const taskListHeaders = ['Name', 'Description', 'Due Date', 'Actions'];
const taskList = ref(tasksStore.taskList);

onMounted(() => {
  // Retrieve locally saved tasks from localStorage
  const locallySavedTasks = localStorage.getItem('taskList')
  // If there are locally saved tasks, add them to the store
  if (locallySavedTasks) {
    //when we load in locally stored tasks, we empty the store first, so we don't get duplicates in hot reloading (no production issue)
    tasksStore.taskList.pop();
    for (const value of JSON.parse(locallySavedTasks)) {
      tasksStore.addNewTask(<SingleTask>value)
    }
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
    @click="updateTaskFormModal({isActive: true, isEditing: false})"
    class="button-primary float-right mb-4"
  >
    Add Task
  </button>
    <table class="table-fixed min-w-full divide-y divide-gray-200">
      <thead>
        <tr>
          <th
            scope="col"
            class="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider"
            v-for="header in taskListHeaders"
          >
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody class="divide-y">
        <tr class="dark:hover:bg-gray-800 hover:bg-gray-200" v-for="task in taskList" :key="task.id">
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
            class="w-1/10 px6 py-4 cursor-pointer flex justify-evenly">
            <font-awesome-icon class="hover:scale-125" icon="fa-solid fa-pen-to-square" @click="editTask(<number>task.id)"/>
            <font-awesome-icon class="hover:scale-125" icon="fa-solid fa-trash" @click="deleteTask(<number>task.id)"/>
          </td>
        </tr>
      </tbody>
    </table>
</template>

<style scoped lang="scss">
</style>
