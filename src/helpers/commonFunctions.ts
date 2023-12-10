import { useTasksStore } from "@/stores/tasks";
import type { TaskFormModal } from "@/types/tasksStoreTypes";

export function updateTaskFormModal(newValue: TaskFormModal) {
  const tasksStore = useTasksStore();
  tasksStore.updateTaskFormModalState(newValue)
}
