import Container from "@mui/material/Container"
import Grid from "@mui/material/Unstable_Grid2"
import React from "react"
import { AddItemForm } from "common/components/AddItemForm/AddItemForm"
import { Todolists } from "../features/todolists/ui/Todolists/Todolists"
import { useAppSelector } from "common/hooks/useAppSelector"
import { Path } from "common/routing/Routing"
import { useCreateTodolistMutation } from "../features/todolists/api/todolistsApi"
import { Navigate } from "react-router-dom"
import { selectIsLoggedIn } from "./appSlice"

export const Main = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const [createTodolist] = useCreateTodolistMutation()

  if (!isLoggedIn) {
    return <Navigate to={Path.Login} />
  }

  const addTodolist = (title: string) => {
    createTodolist(title)
  }

  return (
    <Container fixed>
      <Grid container sx={{ mb: "30px" }}>
        <AddItemForm addItem={addTodolist} />
      </Grid>

      <Grid container spacing={4}>
        <Todolists />
      </Grid>
    </Container>
  )
}
