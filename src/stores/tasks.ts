import { defineStore } from 'pinia'
import type { State, SingleTask, TaskFormModal } from "@/types/tasksStoreTypes";

export const useTasksStore = defineStore('taskStore',
{
  state: (): State => ({
    taskList: [],
    taskFormModal: {
      isActive: false,
      isEditing: false,
      idToEdit: 0
    }
  }),
  actions: {
    /**
     * Updates the state of the task form modal.
     *
     * @param {TaskFormModal} newValue - The new values for the task form modal.
     * @param {boolean} newValue.isActive - Indicates whether the modal is active.
     * @param {boolean} newValue.isEditing - Indicates whether the modal is in editing mode.
     */
    updateTaskFormModalState(newValue: TaskFormModal) {
      this.taskFormModal.isActive = newValue.isActive;
      this.taskFormModal.isEditing = newValue.isEditing;
      this.taskFormModal.idToEdit = (newValue.idToEdit) ?? 0
    },
    /**
     * Adds a new task to the task list.
     *
     * @param {SingleTask} newTaskData - The new task to be added.
     * @param {string} newTaskData.name - The name of the task.
     * @param {string} newTaskData.description - The description of the task.
     * @param {string} newTaskData.dueDate - The due date of the task.
     */
    addNewTask(newTaskData: SingleTask) {
      //We ensure only data is added to the store that we want in case of manual adjustments in the localstorage
      //Give the task an id that we can use later to recognize it
      const finalTaskDataToAdd: SingleTask = {
        name: newTaskData.name,
        description: newTaskData.description,
        dueDate: newTaskData.dueDate,
        id: this.taskList.length + 1
      }

      this.taskList.push(finalTaskDataToAdd)
    },
    editTask(newValue: SingleTask) {
      if (newValue.id) {
        this.taskList[this.findSingleTaskIndex(newValue.id)] = newValue
      }
    },
    /**
     * Deletes a task from the task list based on the specified ID.
     * Uses the `splice` method to remove the task at the identified index,
     * ensuring Vue recognizes this as a mutation for proper reactivity.
     *
     * @param {number} idToDelete - The ID of the task to be deleted.
     */
    deleteTask(idToDelete: number): void {
      const indexToDelete: number = this.findSingleTaskIndex(idToDelete)
      if (indexToDelete !== -1) {
        this.taskList.splice(indexToDelete, 1);
        this.updateTaskListIds();
      }
    },
    /**
     * Updates the IDs of tasks in the task list to ensure they are sequential.
     * This method iterates through the task list and assigns a new sequential
     * ID to each task, starting from 1.
     *
     */
    updateTaskListIds(): void {
      // Update IDs to ensure they are sequential
      this.taskList.forEach((task, index) => {
        task.id = index + 1;
      });
    },
    /**
     * Finds the index of a single task in the task list based on its ID.
     *
     * @param {number} id - The ID of the task to find.
     * @returns {number} - The index of the task in the task list. Returns -1 if not found.
     */
    findSingleTaskIndex(id: number): number {
      return this.taskList.findIndex((obj: SingleTask) => obj.id === id);
    },
  },
})
