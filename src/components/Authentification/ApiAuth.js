import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
// import {build} from "vite"; Wrong inport delete

export const apiAuth = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:5000"
        // use prepareHeaders to set the auth token https://redux-toolkit.js.org/rtk-query/api/fetchBaseQuery#prepareheaders
        // Check refresh token example https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#automatic-re-authorization-by-extending-fetchbasequery
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