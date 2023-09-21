import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const api = createApi({
    baseQuery: fetchBaseQuery(
        {baseUrl: 'http://localhost:3000'}),
    endpoints: (builder) => ({
        getDestinations: builder.query({
            query: (page = 1) => `destinations?_page=${page}&_limit=5`
        }),
        getDestinationById: builder.query({
            query: (id) => `destinations/${id}`,
        }),
    })
})

export const {useGetDestinationsQuery} = api;
export const {useGetDestinationByIdQuery} = api;