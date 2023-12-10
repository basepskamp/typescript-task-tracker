export type SingleTask = {
  name: string;
  description: string;
  dueDate: string;
  id?: number;
}

export type State = {
  taskList: SingleTask[]
  taskFormModal: TaskFormModal
}

export type TaskFormModal = {
  isActive: boolean;
  isEditing: boolean;
  idToEdit?: number
}
