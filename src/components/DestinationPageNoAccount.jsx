import {Banner, Desc, Home, Line, Title} from "../Styles/Banner.js";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {IoLocationOutline} from "react-icons/io5";
import styled from "styled-components";
import React, {useState} from "react";

import Loading from "./UI/Loading.jsx";
import {useGetDestinationByIdQuery} from "../app/services/apiService.js";
import {StyledRating} from "./DestinationPageAccount.jsx";
import  "react-image-gallery/styles/css/image-gallery.css";
import GetReview from "../features/reviews/GetReview.jsx";
import ImageCarousel from "./UI/ImageCarousel.jsx";
export default function DestinationPageNoAccount() {
    const {slug} = useParams();
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
    } = useGetDestinationByIdQuery(slug)

    if (isLoading || isFetching) {
        return (
            <Loading/>
        )
    }
    if (isError) {
        console.log({error});
        return <div>{error.status}</div>;
    }

    return (
        <Home>
            <Line>
                <Destination>
                    <div className={"destination"}>
                        <Banner>
                            <Desc>DISCOVER NOW</Desc>
                            <Title>{destination.title}</Title>
                            {/*<div className={"interactions"}>*/}
                            {/*    <div className={"interested interact"} onClick={routeChange}>*/}
                            {/*        <IoBookmarkOutline className={"icon"}/>*/}
                            {/*        <span>Not interested</span>*/}

                            {/*    </div>*/}
                            {/*    <div className={"visited interact"} onClick={routeChange}>*/}
                            {/*        <IoCheckmarkOutline className={"icon"}/>*/}
                            {/*        <span>Not visited</span>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                        </Banner>
                        <p className={"information"}>{destination.long_desc}</p>

                    </div>
                    <div className={"image-container"}>
                        <ImageCarousel destination = {destination.images}/>
                    </div>
                    <div className={"location"}>
                        <IoLocationOutline
                            className={"icon"}
                        />
                        <p className={"address"}>
                            {destination.address}
                        </p>
                    </div>
                    <div className={"map"}>
                        <iframe
                            className={"map-link"}
                            src={destination.iframe}
                            width="100%"
                            height="100%"
                            style={{border: 0}}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>

                    <Banner className={"reviews"}>
                        <Desc>REVIEW TIME</Desc>
                        <Title>Share your thoughts </Title>
                        <NavLink to={"/signIn"} className={"place-review"}>
                            <div className={"place-review-input"}>
                                <div className={"rating stars"}>
                                    <div className={"review-title"}>Your rating:</div>
                                    <StyledRating name={`rating-1`} value={0} readOnly/>
                                </div>
                                <div className={"rating"}>
                                    <div className={"review-title"}>Your review:</div>
                                    <textarea
                                        rows='1'
                                        className={'text-area'}
                                        placeholder={"I enjoyed..."}
                                        disabled
                                    />
                                </div>
                            </div>
                            <button className={'btn'} disabled>Place Review</button>
                        </NavLink>
                        <GetReview/>
                    </Banner>
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

  .image-container {
    display: flex;
    align-items: center;
    justify-content: center;


    .img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      transition: 0.3s ease;
    }
  }

  .destination {
    display: grid;
    grid-template-columns: 1fr;
    padding: 0px 48px 24px 48px;
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
    max-width: 65vw;
    text-align: center;
  }

  .location {
    padding: 64px 16px 48px 16px;
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

  .map {
    padding-bottom: 48px;
    display: flex;
    align-items: center;
    justify-content: center;

    .map-link {
      width: 65vw;
      height: 40vh;
    }
  }

  .reviews {
    padding-top: 24px;
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
      text-decoration: none;
      margin-top: 24px;
      border: 2px solid var(--color-grey-8);
      padding: 48px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 24px;
      max-width: 65vw;

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
        margin-top: 24px;
        background-color: var(--color-grey-7);
        padding: 12px 18px;
        color: white;
        border: none;
        font-weight: 600;
        transition: 0.3s ease;
        cursor: pointer;
        letter-spacing: 1.1px;
        font-size: 16px;

      }
    }

    .display-review {
      width: 70vw;
      padding-top: 48px;
      display: flex;
      flex-direction: column;
      gap: 24px;

      .review {
        background-color: var(--color-grey-9);
        padding: 16px 24px;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .review-name-text {
        display: flex;
        gap: 16px;
      }

      .name {
        margin: 0;
        color: var(--color-blue-3);
        font-size: 18px;
        font-weight: 600;
        letter-spacing: 1.1px;
      }
    }
  }



`