import DeleteIcon from "@mui/icons-material/Delete"
import IconButton from "@mui/material/IconButton"
import { EditableSpan } from "common/components/EditableSpan/EditableSpan"
import s from "./TodolistTitle.module.css"
import { todolistsApi, useDeleteTodolistMutation, useUpdateTodolistMutation } from "../../../../api/todolistsApi"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import type { RequestStatus } from "../../../../../../app/appSlice"
import type { DomainTodolist } from "../../../../lib/types/types"

type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const { title, id, entityStatus } = todolist
  const dispatch = useAppDispatch()

  const [deleteTodolists] = useDeleteTodolistMutation()
  const [updateTodolist] = useUpdateTodolistMutation()

  const updateQueryData = (status: RequestStatus) => {
    dispatch(
      todolistsApi.util.updateQueryData("getTodolist", undefined, (todolists) => {
        const todolist = todolists.find((tl) => tl.id === id)
        if (todolist) {
          todolist.entityStatus = status
        }
      }),
    )
  }

  const removeTodolistHandler = () => {
    updateQueryData("loading")
    deleteTodolists(id)
      .unwrap() // если нужно обрабатывать ошибки после мутации, иначе они идут в then
      .then(() => {})
      .catch((err) => {
        updateQueryData("failed")
      })
  }
  const updateTodolistHandler = (title: string) => {
    updateTodolist({ id, title })
  }

  return (
    <div className={s.container}>
      <h3>
        <EditableSpan value={title} onChange={updateTodolistHandler} disabled={entityStatus === "loading"} />
      </h3>
      <IconButton onClick={removeTodolistHandler} disabled={entityStatus === "loading"}>
        <DeleteIcon />
      </IconButton>
    </div>
  )
}
