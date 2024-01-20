import { Banner, Desc, Home, Line, Title } from "../Styles/Banner.js";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { IoLocationOutline } from "react-icons/io5";
import styled from "styled-components";
import React, { useState } from "react";

import Loading from "./UI/Loading.jsx";
import {
  useGetDestinationByIdQuery,
  useGetReviewQuery,
} from "../app/services/apiService.js";
import {
  Destination,
  ReviewContainer,
  StyledRating,
} from "./DestinationPageAccount.jsx";
import "react-image-gallery/styles/css/image-gallery.css";
import GetReview from "../features/reviews/GetReview.jsx";
import ImageCarousel from "./UI/ImageCarousel.jsx";
import PostReview from "../features/reviews/PostReview.jsx";

export default function DestinationPageNoAccount() {
  const { slug } = useParams();
  let navigate = useNavigate();
  const routeChange = () => {
    navigate("/signIn");
  };

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
    console.log({ error });
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
          <div className={"map"}>
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
            <PostReviewContainer>
              <NavLink to={"/signIn"} className={"place-review"}>
                <PostReview />
              </NavLink>
            </PostReviewContainer>
            <GetReview comments={comments} />
          </ReviewContainer>
        </Destination>
      </Line>
    </Home>
  );
}
const PostReviewContainer = styled.div`
  .place-review {
    text-decoration: none;
  }
`;
