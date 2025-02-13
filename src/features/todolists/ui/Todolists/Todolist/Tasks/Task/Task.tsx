import DeleteIcon from "@mui/icons-material/Delete"
import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import ListItem from "@mui/material/ListItem"
import { ChangeEvent } from "react"
import { EditableSpan } from "common/components/EditableSpan/EditableSpan"
import { getListItemSx } from "./Task.styles"
import type { DomainTask } from "../../../../../api/tasksApi.types"
import { TaskStatus } from "../../../../../lib/enums/enums"
import { useDeleteTaskMutation, useUpdateTaskMutation } from "../../../../../api/tasksApi"
import { createTaskModel } from "common/utils/createTaskModel"
import type { DomainTodolist } from "../../../../../lib/types/types"

type Props = {
  task: DomainTask
  todolist: DomainTodolist
  disabled: boolean
}

export const Task = ({ task, todolist, disabled }: Props) => {
  const [deleteTask] = useDeleteTaskMutation()
  const [updateTask] = useUpdateTaskMutation()

  const removeTaskHandler = () => {
    deleteTask({ taskId: task.id, todolistId: todolist.id })
  }

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New

    const model = createTaskModel(task, { status })

    updateTask({ taskId: task.id, todolistId: todolist.id, model })
  }

  const changeTaskTitleHandler = (title: string) => {
    const model = createTaskModel(task, { title })
    updateTask({ taskId: task.id, todolistId: todolist.id, model })
  }

  return (
    <ListItem key={task.id} sx={getListItemSx(task.status === TaskStatus.Completed)}>
      <div>
        <Checkbox
          checked={task.status === TaskStatus.Completed}
          onChange={changeTaskStatusHandler}
          disabled={disabled}
        />
        <EditableSpan value={task.title} onChange={changeTaskTitleHandler} disabled={disabled} />
      </div>
      <IconButton onClick={removeTaskHandler} disabled={disabled}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}
