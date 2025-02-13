import { setAppStatus, setAppError } from "../../app/appSlice"
import type { AppDispatch } from "../../app/store"

export const handleHttpErrors = (dispatch: AppDispatch, err: { message: string }) => {
  dispatch(setAppError({ error: err.message }))
  dispatch(setAppStatus({ status: "failed" }))
}
