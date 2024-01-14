import React from "react";
import { StyledRating } from "../../components/DestinationPageAccount.jsx";
import styled from "styled-components";

function ReviewComponent(comments) {
  console.log(comments)
  return (
    <GetReviews>
      {comments
        .map((reviewItem, index) => (
          <Review className={"review"}>
            <div className={"review-name-text"}>
              <p className={"name"}>{reviewItem.username}</p>
              <div className={"review-rating"}>
                <StyledRating
                  name={`rating-${index}`}
                  value={reviewItem.rating}
                  readOnly
                />
                <span className={"date"}>{reviewItem.created_at}</span>
              </div>
            </div>
            <div className={"review-text"}>{reviewItem.body}</div>
          </Review>
        ))
        .reverse()}
    </GetReviews>
  );
}

export default ReviewComponent;

const GetReviews = styled.div`
  width: 65vw;
  padding-top: 48px;
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

  .review-name-text {
    display: flex;
    gap: 16px;

    .review-rating {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .date {
      color: #9fb3c8;
    }
  }

  .name {
    margin: 0;
    color: var(--color-blue-3);
    font-size: 18px;
    font-weight: 600;
    letter-spacing: 1.1px;
  }
`;
