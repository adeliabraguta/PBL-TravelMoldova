import {Banner, Desc, Home, Line, Title} from "../Styles/Banner.js";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {IoLocationOutline, IoBookmarkOutline, IoCheckmarkOutline, IoPersonCircleOutline} from "react-icons/io5";
import styled from "styled-components";
import React, {useState} from "react";

import Loading from "./UI/Loading.jsx";
import {useGetDestinationByIdQuery} from "./Store/ApiData.js";

export default function DestinationPageNoAccount() {
    const {id} = useParams()
    let navigate = useNavigate();
    const routeChange = () => {
        navigate("/signIn");
    }

    const {
        data: destination = [],
        isLoading,
        isFetching,
        isError,
        error
    } = useGetDestinationByIdQuery(id)
    const [review, setReview] = useState("")
    const [reviews, setReviews] = useState([])
    if (isLoading || isFetching) {
        return (
            <Loading/>
        )
    }
    if (isError) {
        console.log({error});
        return <div>{error.status}</div>;
    }
    const onChangeHandler = (e) => {
        setReview(e.target.value)
    }
    const onClickHandler = () => {
        setReviews(comments => [...comments, review])
        setReview('')
    }

    return (
        <Home>
            <Line>
                <Destination>
                    <div className={"destination"}>
                        <Banner>
                            <Desc>DISCOVER NOW</Desc>
                            <Title>{destination.title}</Title>
                            <div className={"interactions"}>
                                <div className={"interested interact"}>
                                    <IoBookmarkOutline className={"icon"}/>
                                    <span>Save</span>

                                </div>
                                <div className={"visited interact"}>
                                    <IoCheckmarkOutline className={"icon"}/>
                                    <span>Not Visited</span>
                                </div>
                            </div>
                        </Banner>
                        <p className={"information"}>{destination.generalInformation}</p>

                    </div>
                    <div className={"carousel_section"}>
                        <div className={"carousel"}>
                            <img className={"img"} src={`/assets/${destination.img}`} alt="image"/>
                            <img className={"img"} src={`/assets/${destination.img2}`} alt="image"/>

                            <img className={"img"} src={`/assets/${destination.img3}`} alt="image"/>
                            <img className={"img"} src={`/assets/${destination.img}`} alt="image"/>


                        </div>
                    </div>
                    <div className={"location"}>
                        <IoLocationOutline
                            className={"icon"}
                        />
                        <p className={"address"}>
                            {destination.address}
                        </p>
                    </div>

                    <div className={"reviews"}>
                        <h2 className={"title"}>Reviews</h2>
                        <div className={"place-review"} >
                            <IoPersonCircleOutline className={"img"}/>
                            <textarea rows='1' value={review} onChange={onChangeHandler} className={'text-area'} placeholder={"Add a review"}/>
                            <button className={'btn'} onClick={onClickHandler}>Place Review</button>
                        </div>
                        <div className={"display-review"}>
                            {reviews.map((review, index) => <div className={"review"} key={index}>{review}</div>)}
                        </div>

                    </div>
                </Destination>
            </Line>
        </Home>
    )
}
const Destination = styled.div`
  .interactions {
    display: flex;
    gap: 48px;

    .interact {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 8px;
      cursor: pointer;

      .icon {
        color: var(--color-blue-4);
      }
    }
  }

  .carousel_section {
    display: flex;
    align-content: center;
    justify-content: center;

    .carousel {
      margin: 0;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 48px;
      align-content: center;
      justify-content: center;

      .img {
        height: 40vh;
        width: 100%;
        object-fit: cover;
        transition: 0.3s ease;
        //&:hover{
        //  transform: scale(1.5);
        //  height: 100%;
        //  width: 100%;
        //}
      }
    }
  }

  .destination {
    display: grid;
    grid-template-columns: 1fr;
    padding: 48px 48px 24px 48px;
    align-items: center;
    justify-items: center;

    .description {
      padding: 0 48px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .desc {
        margin: 0;
        color: #079A82;
        letter-spacing: 1.5px;
        font-size: 14px;
        font-weight: 600;
        text-align: center;
      }

      .title {
        margin: 0;
        color: #102A43;
        padding-top: 8px;
        text-transform: uppercase;
        letter-spacing: 1.2px;
        text-align: center;
        font-size: 24px;
      }
    }
  }

  .information {
    color: #102A43;
    line-height: 1.3;
    margin-top: 32px;
    max-width: 60vw;
    //border-right: solid #D9E2EC;
    //border-left: solid #D9E2EC;
    //padding:0 48px 32px 48px;
    text-align: center;
  }

  .location {
    padding: 32px 16px 48px 16px;
    display: flex;
    align-items: center;
    gap: 16px;
    margin: 0;
    grid-column: 2;
    grid-row: 2;
    justify-content: center;

    .icon {
      color: #2680C2;
    }

    .address {
      margin: 0;
      font-weight: 400;
      font-size: 16px;
      font-style: italic;
    }
  }

  .reviews {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 96px;

    .title {
      color: var(--color-blue-0);
      font-size: 24px;
      letter-spacing: 1.1px;
    }

    .place-review {
      display: flex;
      gap: 24px;
      max-width: 60vw;

      .img {
        height: 70px;
        width: 70px;
        color: var(--color-grey-8);
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

        &:focus{
          border-bottom: 2px solid var(--color-blue-5);
        }
        &:disabled {
          background-color: white;
        }
      }
      .btn{
        background-color: white;
        color: var(--color-grey-7);
        border: 2px solid var(--color-grey-7);
        font-weight: 600;
        transition: 0.3s ease;
        cursor: pointer;
        letter-spacing: 1.1px;
        font-size: 16px;
        &:hover{
          color: var(--color-blue-5);
          border: 2px solid var(--color-blue-5);
        }
      }
    }
    .display-review{
      padding-top: 48px;
    }
  }

`