import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
    baseQuery: fetchBaseQuery(
        {baseUrl: 'http://localhost:3000'}),
    endpoints: (builder) => ({
        getDestinations: builder.query({
            query: (page=1) => `destinations?_page=${page}&_limit=4`
        })
    })
})



export  const {useGetDestinationsQuery} = api;
