import {
  BaseQueryApi,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  QueryReturnValue,
} from "@reduxjs/toolkit/dist/query/react"
import { setAppError } from "../../app/appSlice"
import { ResultCode } from "../../features/todolists/lib/enums/enums"

export const handleError = (
  api: BaseQueryApi,
  result: QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>,
) => {
  let error = "Some error occurred"

  if (result.error) {
    if (result.error.status === 400) {
      api.dispatch(setAppError({ error: (result.error.data as { message: string }).message }))
    }

    if (result.error.status === "PARSING_ERROR") {
      api.dispatch(setAppError({ error: result.error.error }))
    }

    if (result.error.status === 403) {
      api.dispatch(setAppError({ error: "403 Forbidden Error. Check API-KEY" }))
    }

    if (result.error.status === 500) {
      api.dispatch(setAppError({ error: (result.error.data as { message: string }).message }))
    }
  }

  if ((result.data as { resultCode: ResultCode }).resultCode === ResultCode.Error) {
    const messages = (result.data as { messages: string[] }).messages
    error = messages.length ? messages[0] : error
    api.dispatch(setAppError({ error }))
  }

  if ((result.data as { resultCode: ResultCode }).resultCode === ResultCode.Error) {
    const messages = (result.data as { messages: string[] }).messages
    error = messages.length ? messages[0] : error
    api.dispatch(setAppError({ error }))
  }
}

//альтернативный код
/*
if (result.error) {
  switch (result.error.status) {
    case 'FETCH_ERROR':
    case 'PARSING_ERROR':
    case 'CUSTOM_ERROR':
      error = result.error.error
      break

    case 403:
      error = '403 Forbidden Error. Check API-KEY'
      break

    case 400:
    case 500:
      if (isErrorWithMessage(result.error.data)) {
        error = result.error.data.message
      } else {
        error = JSON.stringify(result.error.data)
      }
      break

    default:
      error = JSON.stringify(result.error)
      break
  }
  api.dispatch(setAppError({ error }))
}*/
