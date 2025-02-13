import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@mui/material/styles"
import React, { useEffect, useState } from "react"
import { selectThemeMode, setIsLoggedIn } from "./appSlice"
import { CircularProgress } from "@mui/material"
import s from "./app.module.css"
import { useMeQuery } from "../features/auth/api/authApi"
import { ResultCode } from "../features/todolists/lib/enums/enums"
import {useAppSelector} from "common/hooks/useAppSelector";
import {useAppDispatch} from "common/hooks/useAppDispatch";
import {getTheme} from "common/theme/theme";
import {Header} from "common/components/Header/Header";
import {Routing} from "common/routing/Routing";
import {ErrorSnackbar} from "common/components/ErrorSnackbar/ErrorSnackbar";

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const dispatch = useAppDispatch()

  const { data, isLoading } = useMeQuery()

  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    !isLoading && setIsInitialized(true)
    if (data?.resultCode === ResultCode.Success) {
      dispatch(setIsLoggedIn({ isLoggedIn: true }))
    }
  }, [isLoading, data])

  if (!isInitialized) {
    return (
      <div className={s.circularProgressContainer}>
        <CircularProgress size={150} thickness={3} />
      </div>
    )
  }

  return (
    <ThemeProvider theme={getTheme(themeMode)}>
      <CssBaseline />
      <Header />
      <Routing />
      <ErrorSnackbar />
    </ThemeProvider>
  )
}
