import type { DomainTask, UpdateTaskModel } from "../../features/todolists/api/tasksApi.types"

export const createTaskModel = (task: DomainTask, model: Partial<UpdateTaskModel>): UpdateTaskModel => {
  return {
    title: task.title,
    description: task.description,
    status: task.status,
    priority: task.priority,
    startDate: task.startDate,
    deadline: task.deadline,
    ...model,
  }
}
