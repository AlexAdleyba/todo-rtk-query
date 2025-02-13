import { TaskPriority, TaskStatus } from "../lib/enums/enums"

export type DomainTask = {
  description: string | null
  title: string
  status: TaskStatus
  priority: TaskPriority
  startDate: string | null
  deadline: string | null
  id: string
  todoListId: string
  order: number
  addedDate: string
}

export type GetTasksResponse = {
  error: string | null
  items: DomainTask[]
  totalCount: number
}

export type UpdateTaskModel = Omit<DomainTask, "id" | "addedDate" | "order" | "todoListId">
