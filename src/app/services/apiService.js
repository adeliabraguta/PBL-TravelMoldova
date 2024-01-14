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
    registerUser: builder.mutation({
      query: (credentials) => ({
        url: "http://127.0.0.1:5000/auth/register",
        method: "POST",
        body: { ...credentials },
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
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "http://127.0.0.1:5000/auth/login",
        method: "POST",
        body: { ...credentials },
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
    }),
    putResetPassword: builder.mutation({
      query: (details) => ({
        url: `auth/reset-password`,
        method: "PUT",
        body: { ...details },
      }),
    }),
  }),
});

export const {
  useGetDestinationsQuery,
  useGetDestinationByIdQuery,
  usePostDestinationMutation,
  usePostDestinationImgMutation,
  useRegisterUserMutation,
  useVerificationEmailMutation,
  useReVerificationEmailMutation,
  useLoginUserMutation,
  useGetReviewQuery,
  usePostReviewMutation,
  useGetUserReviewsQuery,
  usePutResetPasswordMutation,
} = api;
