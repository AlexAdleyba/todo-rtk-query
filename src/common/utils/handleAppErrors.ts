import type { AppDispatch } from "../../app/store"
import type { Response } from "common/types/types"
import { setAppStatus, setAppError } from "../../app/appSlice"

export const handleAppErrors = <T>(dispatch: AppDispatch, data: Response<T>) => {
  dispatch(setAppError({ error: data.messages ? data.messages[0] : "Some error" }))
  dispatch(setAppStatus({ status: "failed" }))
}
