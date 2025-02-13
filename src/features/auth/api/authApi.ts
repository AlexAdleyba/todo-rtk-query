import type {Inputs} from "../ui/login/Login"
import type {Response} from "common/types/types"
import {baseApi} from "../../../app/baseApi"

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        me: builder.query<Response<{ id: number; email: string; login: string }>, void>({
            query: () => "auth/me",
        }),
        login: builder.mutation<Response<{ userId: number; token: string }>, Inputs>({
            query: (Inputs) => ({
                method: "POST",
                url: "auth/login",
                body: Inputs,
            }),
        }),
        logout: builder.mutation<Response, void>({
            query: () => ({
                method: "DELETE",
                url: "auth/login",
            }),
        }),
    }),
})

export const {useLoginMutation, useLogoutMutation, useMeQuery} = authApi


