import {createSlice, isFulfilled, isPending, isRejected} from "@reduxjs/toolkit"
import {todolistsApi} from "../features/todolists/api/todolistsApi"
import {taskApi} from "../features/todolists/api/tasksApi"

export type ThemeMode = "dark" | "light"
export type RequestStatus = "idle" | "loading" | "succeeded" | "failed"

export const appSlice = createSlice({
  name: "app",
  initialState: {
    themeMode: "light" as ThemeMode,
    status: "idle" as RequestStatus,
    error: null as null | string,
    isLoggedIn: false,
  },
  reducers: (create) => ({
    changeTheme: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
      state.themeMode = action.payload.themeMode
    }),
    setAppStatus: create.reducer<{ status: RequestStatus }>((state, action) => {
      state.status = action.payload.status
    }),
    setAppError: create.reducer<{ error: null | string }>((state, action) => {
      state.error = action.payload.error
    }),
    setIsLoggedIn: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
    }),
  }),
  extraReducers: (builder) => {
    builder.addMatcher(isPending, (state, action) => {
      if (todolistsApi.endpoints.getTodolist.matchPending(action) || taskApi.endpoints.getTasks.matchPending(action)) {
        return // прячем крутилку, пока показываются скелетоны
      }
      state.status = "loading"
    })
    builder.addMatcher(isFulfilled, (state) => {
      state.status = "succeeded"
    })
    builder.addMatcher(isRejected, (state) => {
      state.status = "failed"
    })
  },
  selectors: {
    selectThemeMode: (state) => state.themeMode,
    selectStatus: (state) => state.status,
    selectError: (state) => state.error,
    selectIsLoggedIn: (state) => state.isLoggedIn,
  },
})

export const appReducer = appSlice.reducer
export const { changeTheme, setAppStatus, setAppError, setIsLoggedIn } = appSlice.actions
export const { selectThemeMode, selectStatus, selectError, selectIsLoggedIn } = appSlice.selectors

// export type AppState = ReturnType<typeof appSlice.getInitialState> получить тип initialState

