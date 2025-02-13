import MenuIcon from "@mui/icons-material/Menu"
import AppBar from "@mui/material/AppBar"
import IconButton from "@mui/material/IconButton"
import Switch from "@mui/material/Switch"
import Toolbar from "@mui/material/Toolbar"
import React from "react"
import {changeTheme, selectIsLoggedIn, selectStatus, selectThemeMode, setIsLoggedIn} from "../../../app/appSlice"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { useAppSelector } from "../../hooks/useAppSelector"
import { getTheme } from "../../theme/theme"
import { MenuButton } from "../MenuButton/MenuButton"
import { LinearProgress } from "@mui/material"
import { useLogoutMutation } from "../../../features/auth/api/authApi"
import { ResultCode } from "../../../features/todolists/lib/enums/enums"
import { baseApi } from "../../../app/baseApi"

export const Header = () => {
  const dispatch = useAppDispatch()

  const themeMode = useAppSelector(selectThemeMode)
  const status = useAppSelector(selectStatus)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const theme = getTheme(themeMode)

  const changeModeHandler = () => {
    dispatch(changeTheme({ themeMode: themeMode === "light" ? "dark" : "light" }))
  }

  const [logout] = useLogoutMutation()

  const logoutHandler = () => {
    logout().then((res) => {
      if (res.data?.resultCode === ResultCode.Success) {
        localStorage.removeItem("token")
        dispatch(setIsLoggedIn({ isLoggedIn: false }))
        dispatch(baseApi.util.resetApiState()) //чистим весь кэш.
        // if().then(()=>{
        // dispatch(baseApi.util.invalidateTags(["Todolist", "Task"]))
        // }) - если хотим зачистить в кэше только тудулисты и таски
      }
    })
  }

  return (
    <AppBar position="static" sx={{ mb: "30px" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton color="inherit">
          <MenuIcon />
        </IconButton>
        <div>
          {isLoggedIn && <MenuButton onClick={logoutHandler}>Logout</MenuButton>}
          <MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
          <Switch color={"default"} onChange={changeModeHandler} />
        </div>
      </Toolbar>
      {status === "loading" && <LinearProgress />}
    </AppBar>
  )
}
