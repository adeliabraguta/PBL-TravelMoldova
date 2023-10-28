import {Banner} from "../../Styles/Banner.js";
import {StyledRating} from "../../components/DestinationPageAccount.jsx";
import React, {useRef} from "react";
import {useGetReviewQuery} from "../../app/services/apiService.js";
import {useParams} from "react-router-dom";
import styled from "styled-components";

export default function GetReview(){
    const ref= useRef()
    const slug = useParams()
    const {
        data: comments = []
    } = useGetReviewQuery(slug.slug)

    return(
        <Banner>
            <GetReviews className={"display-review"}>
                {comments.map((reviewItem, index) => (
                    <div className={"review"} key={index}>
                        <div className={"review-name-text"}>
                            <p className={"name"}>{reviewItem.username}</p>
                            <div className={"review-rating"}>
                                <StyledRating name={`rating-${index}`} value={reviewItem.rating} readOnly />
                                <span className={"date"}>{reviewItem.created_at}</span>
                            </div>
                        </div>
                        <div className={"review-text"}>{reviewItem.body}</div>
                    </div>
                )).reverse()}
            </GetReviews>
        </Banner>
    )
}
const GetReviews = styled.div`
    width: 70vw;
    padding-top: 48px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    .review{
      background-color: var(--color-grey-9);
      padding: 16px 24px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .review-name-text{
      display: flex;
      gap: 16px;
      .review-rating{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .date{
        color: #9FB3C8;
      }
    }
    .name{
      margin: 0;
      color: var(--color-blue-3);
      font-size: 18px;
      font-weight: 600;
      letter-spacing: 1.1px;
    }
`