import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:5000",
        // credentials: 'include',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.access_token
            if (token) {
                headers.set("authorization", `Bearer ${token}`)
            }
            return headers
        }
    }),
    endpoints: (builder) => ({
        getDestinations: builder.query({
            query: (page = 1) => `posts?_page=${page}&_limit=6`
        }),
        getDestinationById: builder.query({
            query: (slug) => `posts/${slug}`,
        }),
        registerUser: builder.mutation({
            query: credentials => ({
                url: 'http://127.0.0.1:5000/auth/register',
                method: 'POST',
                body: { ...credentials }
            }),
        }),
        loginUser: builder.mutation({
            query: credentials => ({
                url: 'http://127.0.0.1:5000/auth/login',
                method: 'POST',
                body: {...credentials}
            })
        }),

    })
})


export const {
    useGetDestinationByIdQuery,
    useGetDestinationsQuery,
    useLoginUserMutation,
    useRegisterUserMutation,
} = api;


