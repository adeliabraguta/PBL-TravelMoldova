import { Banner, Desc, Title } from "../../Styles/Banner.js";
import React, { useCallback, useEffect, useState } from "react";
import { StyledRating } from "../../components/DestinationPageAccount.jsx";
import {
  useGetReviewQuery,
  usePostReviewMutation,
} from "../../app/services/apiService.js";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setComment } from "./reviewSlice.js";
import styled from "styled-components";
import { useFormik } from "formik";
import { loginSchema } from "../authentification/schemas/schemaLogin.js";
import { ReviewSchema } from "./postRevireSchema.js";

export default function PostReview() {
  const slug = useParams();
  const [rating, setRating] = useState(0);
  const { data: comments = [] } = useGetReviewQuery(slug.slug);
  const [reviewPost, { isSuccess, data }] = usePostReviewMutation();
  const title = "title";

  const onSubmit = () => {
    reviewPost({
      review: { body: values.review, rating: values.rating, title },
      slug: slug.slug,
    });
    values.review = "";
    values.rating = 0;
  };
  const { values, handleChange, errors, handleSubmit } = useFormik({
    initialValues: {
      rating: 0,
      review: "",
    },
    validationSchema: ReviewSchema,
    onSubmit,
  });
  console.log(errors);
  return (
    <PostReviews>
      <form className={"place-review"} onSubmit={handleSubmit}>
        <div className={"place-review-input"}>
          <div className={"rating stars"}>
            <div className={"review-title"}>Your rating:</div>
            <StyledRating
              name="rating"
              value={values.rating}
              onChange={handleChange}
            />
          </div>
          <div className={"rating"}>
            <div className={"review-title"}>Your review:</div>
            <textarea
              name={"review"}
              rows="1"
              value={values.review}
              onChange={handleChange}
              className={"text-area"}
              placeholder={"I enjoyed..."}
            />
          </div>
        </div>
        <button type={"submit"} className={"btn"}>
          Place Review
        </button>
      </form>
    </PostReviews>
  );
}
const PostReviews = styled.div`
  .title {
    color: var(--color-blue-0);
    font-size: 24px;
    letter-spacing: 1.1px;
  }

  .place-review {
    border: 2px solid var(--color-grey-8);
    padding: 48px;
    display: flex;
    flex-direction: column;
    gap: 24px;

    .place-review-input {
      display: flex;
      flex-direction: column;
      gap: 24px;

      .rating {
        display: flex;
        flex-direction: column;
        gap: 8px;

        .review-title {
          font-size: 18px;
          letter-spacing: 1px;
          color: var(--color-blue-0);
          font-weight: 600;
        }
      }

      .stars {
        flex-direction: row;
        gap: 18px;
      }
    }

    .text-area {
      border: none;
      overflow: auto;
      outline: none;
      padding: 12px 20px;
      box-sizing: border-box;
      border-bottom: 2px solid var(--color-grey-7);
      font-size: 16px;
      resize: none;

      &:focus {
        border-bottom: 2px solid var(--color-green-5);
      }

      &:disabled {
        background-color: white;
      }
    }

    .btn {
      background-color: var(--color-green-2);
      border: none;
      padding: 12px;
      color: white;
      font-size: 20px;
      letter-spacing: 1.1px;
      cursor: pointer;
      transition: 0.3s ease;

      &:disabled {
        background-color: var(--color-grey-4);
        cursor: not-allowed;

        &:hover {
          background-color: var(--color-grey-4);
        }
      }

      &:hover {
        background-color: var(--color-green-4);
      }
    }
  }
`;
