import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {build} from "vite";

export const apiAuth = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:5000"
    }),
    endpoints: builder => ({
        createUser: build.mutation({
            query: newUser => ({
                url: '/auth/register',
                method: 'POST',
                data: newUser,
            }),
        }),
        loginUser: build.mutation({
            query: loginData => ({
                url: '/auth/login',
                method: 'POST',
                data: loginData,
            }),
        }),
    })
})

export const {
    useCreateUserMutation,
    useLoginUserMutation
} = apiAuth