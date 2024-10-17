import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:5000",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.access_token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getDestinations: builder.query({
      query: (page) => `posts/?page=${page}&pagesize=6`,
    }),
    getDestinationById: builder.query({
      query: (slug) => `posts/${slug}`,
    }),
    postDestination: builder.mutation({
      query: (information) => ({
        url: "posts",
        method: "POST",
        body: { ...information },
      }),
    }),
    postDestinationImg: builder.mutation({
      query: ({ information, slug }) => ({
        url: `posts/${slug}/image`,
        method: "PUT",
        body: information,
      }),
    }),
    verificationEmail: builder.mutation({
      query: (token) => ({
        url: `http://127.0.0.1:5000/auth/verify-email?token=${token}`,
        method: "POST",
        query: token,
      }),
    }),
    reVerificationEmail: builder.mutation({
      query: (email) => ({
        url: `http://127.0.0.1:5000/auth/verify-email?email=${email}`,
        method: "POST",
        query: email,
      }),
    }),
    getReview: builder.query({
      query: (slug) => `comments/location/${slug}`,
      providesTags: ["getReview"],
    }),
    postReview: builder.mutation({
      query: ({ review, slug }) => ({
        url: `comments/${slug}`,
        method: "POST",
        body: { ...review },
      }),
      invalidatesTags: ["getReview"],
    }),
    getUserReviews: builder.query({
      query: (username) => `comments/user/${username}`,
      providesTags: ["deleteReview"],
    }),
    putResetPassword: builder.mutation({
      query: (details) => ({
        url: `auth/reset-password`,
        method: "PUT",
        body: { ...details },
      }),
    }),
    getResetEmail: builder.query({
      query: (email) => `auth/forgot-password?username_or_email=${email}`,
    }),
    deleteReview: builder.mutation({
      query: (comment) => ({
        url: `/comments/${comment}`,
        method: "DELETE",
        body: { ...comment },
      }),
      invalidatesTags: ["deleteReview"],
    }),
  }),
});

export const {
  useGetDestinationsQuery,
  useGetDestinationByIdQuery,
  usePostDestinationMutation,
  usePostDestinationImgMutation,
  useVerificationEmailMutation,
  useReVerificationEmailMutation,
  useGetReviewQuery,
  usePostReviewMutation,
  useGetUserReviewsQuery,
  usePutResetPasswordMutation,
  useGetResetEmailQuery,
  useDeleteReviewMutation,
} = api;
