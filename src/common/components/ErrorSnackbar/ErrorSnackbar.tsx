import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar"
import Alert from "@mui/material/Alert"
import { type SyntheticEvent } from "react"
import { useAppSelector } from "common/hooks/useAppSelector"
import { selectError } from "../../../app/appSlice"
import { setAppError } from "../../../app/appSlice"
import { useAppDispatch } from "common/hooks/useAppDispatch"

export const ErrorSnackbar = () => {
  const error = useAppSelector(selectError)
  const dispatch = useAppDispatch()

  const handleClose = (_: SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === "clickaway") {
      return
    }
    dispatch(setAppError({ error: null }))
  }

  return (
    <div>
      <Snackbar open={error !== null} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" variant="filled">
          {error}
        </Alert>
      </Snackbar>
    </div>
  )
}
