import { Todolist } from "./todolistsApi.types"
import { Response } from "common/types/types"
import { instance } from "common/instance/instance"
import { baseApi } from "../../../app/baseApi"
import type { DomainTodolist } from "../lib/types/types"

export const todolistsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTodolist: builder.query<DomainTodolist[], void>({
      query: () => "todo-lists",
      transformResponse(todolists: Todolist[]): DomainTodolist[] {
        return todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }))
      },
      providesTags: ["Todolist"],
    }),
    createTodolist: builder.mutation<Response<{ item: Todolist }>, string>({
      query: (title) => ({
        method: "POST",
        url: "todo-lists",
        body: { title },
      }),
      invalidatesTags: ["Todolist"],
    }),
    deleteTodolist: builder.mutation<Response, string>({
      query: (id) => ({
        method: "DELETE",
        url: `todo-lists/${id}`,
      }),
      invalidatesTags: ["Todolist"],
    }),
    updateTodolist: builder.mutation<Response, { id: string; title: string }>({
      query: ({ id, title }) => ({
        method: "PUT",
        url: `todo-lists/${id}`,
        body: { title },
      }),
      invalidatesTags: ["Todolist"],
    }),
  }),
})

export const { useGetTodolistQuery, useCreateTodolistMutation, useDeleteTodolistMutation, useUpdateTodolistMutation } =
  todolistsApi

export const _todolistsApi = {
  getTodolists() {
    return instance.get<DomainTodolist[]>(`todo-lists`)
  },
  createTodolist(title: string) {
    return instance.post<Response<{ item: DomainTodolist }>>(`todo-lists`, { title })
  },
  removeTodolist(id: string) {
    return instance.delete<Response>(`todo-lists/${id}`)
  },
  updateTodolist(args: { id: string; title: string }) {
    const { id, title } = args
    return instance.put<Response>(`todo-lists/${id}`, { title })
  },
}
