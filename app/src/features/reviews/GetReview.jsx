import React from "react";
import styled from "styled-components";
import ReviewComponent from "./reviewComponent.jsx";
import { IoTrashBinOutline } from "react-icons/io5";
import { useDeleteReviewMutation } from "../../app/services/apiService.js";
import { useSelector } from "react-redux";

export default function GetReview({ reviews }) {
  const [deleteReview, { isSuccess }] = useDeleteReviewMutation();
  const role = useSelector((state) => state.auth.user.role);
  const reviewDelete = (comment) => {
    deleteReview(comment);
  };
  return (
    <Reviews>
      {reviews &&
        reviews
          .map((review, index) => (
            <div key={review._id}>
              {role === "admin" && (
                <div className={"hasPermission"} >
                  <ReviewComponent
                    reviewItem={review}
                    index={index}
                  />
                  <IoTrashBinOutline
                    className={"icon"}
                    index={index}
                    onClick={() => reviewDelete(reviewItem.review._id)}
                  />
                </div>
              )}
              {role === "user" || role === null && (
                <div>
                  <ReviewComponent reviewItem={review} index={index} />
                </div>
              )}
            </div>
          ))
          .reverse()}
      {reviews && reviews.length === 0 && (
        <Review>
          <p>No reviews yet</p>
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

  .hasPermission {
    display: grid;
    grid-template-columns: 95% 5%;
    gap: 24px;
    justify-content: center;
    align-items: center;

    .icon {
      height: 20px;
      width: 20px;
      color: var(--color-green-2);
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        color: var(--color-blue-6);
      }
    }
  }
`;
const Review = styled.div`
  background-color: var(--color-grey-9);
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  p {
    white-space: normal;
    word-wrap: break-word;
  }
`;
