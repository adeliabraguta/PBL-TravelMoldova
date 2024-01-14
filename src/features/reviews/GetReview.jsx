import { Banner } from "../../Styles/Banner.js";
import { StyledRating } from "../../components/DestinationPageAccount.jsx";
import React, { useRef, useState } from "react";
import { useGetReviewQuery } from "../../app/services/apiService.js";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

export default function GetReview({ comments }) {
  return (
    <Reviews>
      {comments
        .map((reviewItem, index) => (
          <Review key={index}>
            <div>
              <div>
                {reviewItem.username && (
                  <p className={"title"}>{reviewItem.username}</p>
                )}
                {reviewItem.slug && (
                  <Link className={"title"} to={`/posts/${reviewItem.slug}`}>
                    {reviewItem.slug?.split("-").join(" ")}
                  </Link>
                )}

                <StyledRating
                  name={`rating-${index}`}
                  value={reviewItem.rating}
                  readOnly
                />
              </div>
              <span>{reviewItem.created_at}</span>
            </div>
            <p>{reviewItem.body}</p>
          </Review>
        ))
        .reverse()}
      {comments.length === 0 && (
        <Review>
          <p>No comments yet for this destination.</p>
        </Review>
      )}
    </Reviews>
  );
}
const Reviews = styled.div`
  width: 50vw;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
const Review = styled.div`
  background-color: var(--color-grey-9);
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;

    .title {
      margin: 0;
      color: var(--color-blue-3);
      font-size: 18px;
      font-weight: 600;
      letter-spacing: 1.1px;
      text-decoration: none;
    }
  }

  span {
    color: #9fb3c8;
  }
  p{
    white-space: normal;
    word-wrap: break-word
  }
`;
