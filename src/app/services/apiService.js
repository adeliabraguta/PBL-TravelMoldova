import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { useDispatch } from "react-redux";
import {
  setAuthStatus,
  unsetCredentials,
} from "../../features/authentification/authSlice.js";
import { toast } from "react-toastify";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000/",
  credentials: "include",
});
const baseQueryWithReauth = async (args = {}, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    api.dispatch(unsetCredentials());
    toast.error("Unauthorized. Please sign in");
  }

  return result;
};
export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,

  endpoints: (builder) => ({
    getDestinations: builder.query({
      query: ({ page, limit, search, type, rating }) => {
        const searchParams = new URLSearchParams();
        page && searchParams.append("page", page);
        limit && searchParams.append("limit", limit);
        search && searchParams.append("search", search);
        type && searchParams.append("type", type);
        rating && searchParams.append("rating", rating);
        return `destinations/?${searchParams.toString()}`;
      },
    }),
    getDestinationById: builder.query({
      query: (id) => `destination/${id}`,
    }),
    postDestination: builder.mutation({
      query: (information) => ({
        url: "destination",
        method: "POST",
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
    getReviews: builder.query({
      query: (id) => `reviews/${id}`,
      providesTags: ["getReview"],
    }),
    postReview: builder.mutation({
      query: ({ review, id }) => ({
        url: `reviews/${id}`,
        method: "POST",
        body: { ...review },
      }),
      invalidatesTags: ["getReview"],
    }),
    getUserReviews: builder.query({
      query: () => `user/reviews`,
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
  useVerificationEmailMutation,
  useReVerificationEmailMutation,
  useGetReviewsQuery,
  usePostReviewMutation,
  useGetUserReviewsQuery,
  usePutResetPasswordMutation,
  useGetResetEmailQuery,
  useDeleteReviewMutation,
} = api;
