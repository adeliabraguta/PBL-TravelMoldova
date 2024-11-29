import React from "react";
import { StyledRating } from "../../components/DestinationPageAccount.jsx";
import styled from "styled-components";
import { Link } from "react-router-dom";

function ReviewComponent({ reviewItem, index }) {
  const date = new Date(reviewItem.date);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = new Intl.DateTimeFormat("en-Us", options).format(date);

  return (
    <Review>
      <div>
        <div>
          {reviewItem && <p className={"title"}>{reviewItem._user.username}</p>}
          {reviewItem._destination._id && (
            <Link className={"title"} to={`/posts/${reviewItem._destination._id}`}>
              {reviewItem._destination.name}
            </Link>
          )}
          <StyledRating
            name={`rating-${index}`}
            value={reviewItem.rating}
            readOnly
          />
        </div>
        <span>on {formattedDate}</span>
      </div>
      <p>{reviewItem.comment}</p>
    </Review>
  );
}

export default ReviewComponent;

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

  p {
    white-space: normal;
    word-wrap: break-word;
  }
`;
