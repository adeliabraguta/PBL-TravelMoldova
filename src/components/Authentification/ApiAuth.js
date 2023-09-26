import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const apiAuth = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:5000",
        credentials:'include',
        prepareHeaders: (headers, {getState}) =>{
            const token= getState().auth.access_token
            if(token) {
                headers.set("authorization", `Bearer ${token}`)
            }
            return headers
        }
    }),
    endpoints: builder => ({
        // createUser: builder.mutation({
        //     query: newUser => ({
        //         url: '/auth/register',
        //         method: 'POST',
        //         body: {...credentials}
        //
        //     }),
        // }),
        loginUser: builder.mutation({
            query: credentials => ({
                url: '/auth/login',
                method: 'POST',
                body: {...credentials}
            }),
        }),
    })
})

export const {
    useCreateUserMutation,
    useLoginUserMutation
} = apiAuth