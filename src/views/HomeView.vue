<template>
  <main>
    <TaskList />
    <TaskForm v-if="tasksStore.taskFormModal.isActive"/>
  </main>
</template>
<script setup lang="ts">
import TaskList from '@/components/data-tables/TaskList.vue'
import TaskForm from '../components/forms/TaskForm.vue'
import { useTasksStore } from "@/stores/tasks";
const tasksStore = useTasksStore();
</script>
