import { Banner, Desc, Home, Line, Title } from "../Styles/Banner.js";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  IoLocationOutline,
  IoBookmarkOutline,
  IoCheckmarkOutline,
  IoPersonCircleOutline,
} from "react-icons/io5";
import styled from "styled-components";
import React, { useCallback, useEffect, useState } from "react";

import Loading from "./UI/Loading.jsx";
import {
  useGetDestinationByIdQuery,
  useGetReviewQuery,
  usePostReviewMutation,
} from "../app/services/apiService.js";
import { Rating, Typography } from "@mui/material";
import { setComment } from "../features/reviews/reviewSlice.js";
import { setCredentials } from "../features/authentification/authSlice.js";
import { useDispatch } from "react-redux";
import PostReview from "../features/reviews/PostReview.jsx";
import GetReview from "../features/reviews/GetReview.jsx";
import ImageCarousel from "./UI/ImageCarousel.jsx";

export default function DestinationPageNoAccount() {
  const { slug } = useParams();
  const dispatch = useDispatch();

  const {
    data: destination = [],
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetDestinationByIdQuery(slug);

  const { data: comments = [] } = useGetReviewQuery(slug);

  if (isLoading || isFetching) {
    return <Loading />;
  }
  if (isError) {
    return <div>{error.status}</div>;
  }

  return (
    <Home>
      <Line>
        <Destination>
          <Banner>
            <Desc>DISCOVER NOW</Desc>
            <Title>{destination.title}</Title>
            <p className={"information"}>{destination.long_desc}</p>
          </Banner>
          <div className={"image_container"}>
            <ImageCarousel destination={destination.images} />
          </div>
          <div className={"location"}>
            <IoLocationOutline className={"icon"} />
            <p className={"address"}>{destination.address}</p>
          </div>
          <div className={'map'}>
          <iframe
            className={"map-link"}
            src={destination.iframe}
            width="100%"
            height="300px"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          </div>
            <Banner>
              <Desc>REVIEW TIME</Desc>
              <Title>Share your thoughts </Title>
            </Banner>
              <ReviewContainer>
                <PostReview />
                <GetReview comments={comments} />
              </ReviewContainer>
        </Destination>
      </Line>
    </Home>
  );
}

export const ReviewContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  padding-top: 24px;
  padding-bottom: 96px;
`;
export const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#079A82",
  },
  "& .MuiRating-iconHover": {
    color: "#016457",
  },
});
export const Destination = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 96px;

  .image_container {
    width: 100%;
    padding-bottom: 96px;
    display: flex;
    justify-content: center;
  }

  .information {
    color: #102a43;
    line-height: 1.3;
    margin-top: 32px;
    text-align: center;
    width: 60vw;
    
  }

  .location {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    padding-bottom: 24px;

    .icon {
      color: #2680c2;
    }

    .address {
      margin: 0;
      font-weight: 400;
      font-size: 16px;
      font-style: italic;
    }
  }

  .map {
    width: 100%;
    padding-bottom: 96px;
  }

`;
