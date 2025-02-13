import { DomainTask, GetTasksResponse, UpdateTaskModel } from "./tasksApi.types"
import { Response } from "common/types/types"
import { baseApi } from "../../../app/baseApi"

export const taskApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<GetTasksResponse, string>({
      query: (todolistId) => `todo-lists/${todolistId}/tasks`,
      providesTags: ["Task"],
    }),
    createTask: builder.mutation<Response<{ item: DomainTask }>, { title: string; todolistId: string }>({
      query: ({ todolistId, title }) => ({
        method: "POST",
        url: `todo-lists/${todolistId}/tasks`,
        body: { title },
      }),
      invalidatesTags: ["Task"],
    }),
    deleteTask: builder.mutation<Response, { taskId: string; todolistId: string }>({
      query: ({ taskId, todolistId }) => ({
        method: "DELETE",
        url: `todo-lists/${todolistId}/tasks/${taskId}`,
      }),
      invalidatesTags: ["Task"],
    }),
    updateTask: builder.mutation<
      Response<{ item: DomainTask }>,
      { todolistId: string; taskId: string; model: UpdateTaskModel }
    >({
      query: ({ todolistId, taskId, model }) => ({
        method: "PUT",
        url: `todo-lists/${todolistId}/tasks/${taskId}`,
        body: model,
      }),
      invalidatesTags: ["Task"],
    }),
  }),
})

export const { useGetTasksQuery, useCreateTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation } = taskApi
