import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const storiesApi = createApi({
  reducerPath: "storiesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getStories: builder.query({
      query: (page = 1) => `stories`,
    }),
    getStoryById: builder.query({
      query: (id) => `stories/${id}`,
    }),
  }),
});

export const {
  useGetStoriesQuery,
  useGetStoryByIdQuery,
} = storiesApi;
