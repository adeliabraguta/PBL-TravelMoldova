import {Banner, Desc, Home, Line, Title} from "../Styles/Banner.js";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {IoLocationOutline, IoBookmarkOutline, IoCheckmarkOutline, IoPersonCircleOutline} from "react-icons/io5";
import styled from "styled-components";
import React, {useCallback, useEffect, useState} from "react";

import Loading from "./UI/Loading.jsx";
import {useGetDestinationByIdQuery, useGetReviewQuery, usePostReviewMutation} from "../app/services/apiService.js";
import {Rating, Typography} from "@mui/material";
import {setComment} from "../features/reviews/reviewSlice.js";
import {setCredentials} from "../features/authentification/authSlice.js";
import {useDispatch} from "react-redux";
import PostReview from "../features/reviews/PostReview.jsx";
import GetReview from "../features/reviews/GetReview.jsx";
import ImageCarousel from "./UI/ImageCarousel.jsx";

export default function DestinationPageNoAccount() {

    const {slug} = useParams()
    const dispatch = useDispatch()


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
                            {/*    <div className={"interested interact"}>*/}
                            {/*        <IoBookmarkOutline className={"icon"}/>*/}
                            {/*        <span>Save</span>*/}

                            {/*    </div>*/}
                            {/*    <div className={"visited interact"}>*/}
                            {/*        <IoCheckmarkOutline className={"icon"}/>*/}
                            {/*        <span>Not Visited</span>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                        </Banner>
                        <p className={"information"}>{destination.long_desc}</p>

                    </div>
                    <div className={"image-container"}>
                        {/*{destination.images.map((img, index) => (*/}
                        {/*    <img className={"img"} src={`http://127.0.0.1:5000${img}`} alt="image" key={index}/>*/}
                        {/*))}*/}
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
                        <PostReview/>
                        <GetReview/>
                    </Banner>
                </Destination>
            </Line>
        </Home>
    )
}
export const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#079A82',
    },
    '& .MuiRating-iconHover': {
        color: '#016457',
    },
});
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
    max-width: 60vw;
    //border-right: solid #D9E2EC;
    //border-left: solid #D9E2EC;
    //padding:0 48px 32px 48px;
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
      width: 70vw;
      height: 40vh;
    }
  }

  .reviews {
    padding-top: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 96px;
  }

`