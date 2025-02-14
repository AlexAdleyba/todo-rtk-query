import {DomainTask, GetTasksResponse, UpdateTaskModel} from "./tasksApi.types"
import {Response} from "common/types/types"
import {baseApi} from "../../../app/baseApi"

export const taskApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getTasks: build.query<GetTasksResponse, string>({
      query: ( todolistId ) => `todo-lists/${todolistId}/tasks`,
      providesTags: (res, err,  todolistId ) => [{ type: 'Task', id: todolistId }],
    }),
    createTask: build.mutation<
        Response<{ item: DomainTask }>,
        { todolistId: string; title: string }
    >({
      query: ({ todolistId, title }) => ({
        method: 'POST',
        url: `todo-lists/${todolistId}/tasks`,
        body: { title },
      }),
      invalidatesTags: (result, error, { todolistId }) => [{ type: 'Task', id: todolistId }],
    }),
    deleteTask: build.mutation<Response, { todolistId: string; taskId: string }>({
      query: ({ todolistId, taskId }) => ({
        method: 'DELETE',
        url: `todo-lists/${todolistId}/tasks/${taskId}`,
      }),
      invalidatesTags: (result, error, { todolistId }) => [{ type: 'Task', id: todolistId }],
    }),
    updateTask: build.mutation<
        Response<{ item: DomainTask }>,
        { todolistId: string; taskId: string; model: UpdateTaskModel }
    >({
      query: ({ todolistId, taskId, model }) => ({
        method: 'PUT',
        url: `todo-lists/${todolistId}/tasks/${taskId}`,
        body: model,
      }),
      invalidatesTags: (result, error, { todolistId }) => [{ type: 'Task', id: todolistId }],
    }),
  }),
})

export const {useGetTasksQuery, useCreateTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation} = taskApi


