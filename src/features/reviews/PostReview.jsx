import {Banner, Desc, Title} from "../../Styles/Banner.js";
import React, {useCallback, useEffect, useState} from "react";
import {StyledRating} from "../../components/DestinationPageAccount.jsx";
import {useGetReviewQuery, usePostReviewMutation} from "../../app/services/apiService.js";
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setComment} from "./reviewSlice.js";
import styled from "styled-components";

export default function PostReview(){
    const slug = useParams()
    const dispatch = useDispatch()
    const [body, setBody] = useState('');
    const title = 'ada'
    const [rating, setRating] = useState(0);
    const enabled = rating > 0 && body.length > 0
    const {
        data: comments = []
    } = useGetReviewQuery(slug.slug)
    const [
        reviewPost, {isSuccess, data}
    ] = usePostReviewMutation()
    useEffect(() => {
            if(isSuccess) {
                dispatch(setComment({...data, body, rating: rating, title}))
            }
        },
        [isSuccess]
    )

    const onClickHandler = useCallback((e) => {
        e.preventDefault()
        reviewPost({ review :{body, rating, title}, slug: slug.slug,});
    }, [body, rating, title]);


    return(
        <Banner>
            <PostReviews>
            <form className={"place-review"} onSubmit={onClickHandler} >
                <div className={"place-review-input"}>
                    <div className={"rating stars"}>
                        <div className={"review-title"}>Your rating:</div>
                        <StyledRating
                            name="simple-controlled"
                            value={rating}
                            onChange={(event, newValue) => {
                                setRating(newValue);
                            }}
                        />
                    </div>
                    <div className={"rating"}>
                        <div className={"review-title"}>Your review:</div>
                        <textarea
                            rows='1'
                            value={body.text}
                            onChange={e => setBody(e.target.value)}
                            className={'text-area'}
                            placeholder={"I enjoyed..."}
                        />
                    </div>
                </div>
                <button className={'btn'} disabled={!enabled} >Place Review</button>
            </form>
            </PostReviews>
        </Banner>
    )
}
const PostReviews = styled.div`

    .title {
      color: var(--color-blue-0);
      font-size: 24px;
      letter-spacing: 1.1px;
    }

    .place-review {
      margin-top: 24px;
      border: 2px solid var(--color-grey-8);
      padding: 48px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 24px;
      max-width: 60vw;

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
        width: 60vw;

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
`