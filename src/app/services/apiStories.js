import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const storiesApi = createApi({
  reducerPath: "storiesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000", // Adjust the base URL for the stories API
  }),
  endpoints: (builder) => ({
    getStories: builder.query({
      query: (page = 1) => `stories?_page=${page}&_limit=5`,
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
