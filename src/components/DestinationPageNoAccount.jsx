import { Banner, Desc, Home, Line, Title } from "../Styles/Banner.js";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import React from "react";

import Loading from "./UI/Loading.jsx";
import {
  useGetDestinationByIdQuery,
  useGetReviewsQuery,
} from "../app/services/apiService.js";
import {
  Destination,
  ReviewContainer,
} from "./DestinationPageAccount.jsx";
import "react-image-gallery/styles/css/image-gallery.css";
import GetReview from "../features/reviews/GetReview.jsx";
import PostReview from "../features/reviews/PostReview.jsx";
import DestinationPageComponent from "./DestinationPageComponent.jsx";
import {useDispatch} from "react-redux";
import {setAuthPopup} from "../features/authentification/authSlice.js";

export default function DestinationPageNoAccount() {
  const { id } = useParams();
  const dispatch = useDispatch()

  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetDestinationByIdQuery(id);

  const { data: reviews } = useGetReviewsQuery(id);

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
            <Title>{data.name}</Title>
          </Banner>
          <DestinationPageComponent data={data} />
          <Banner>
            <Desc>REVIEW TIME</Desc>
            <Title>Share your thoughts </Title>
          </Banner>
          <ReviewContainer>
            <PostReviewContainer>
              <div
                onClick={() => dispatch(setAuthPopup())}
                className={"place-review"}
              >
                <PostReview />
              </div>
            </PostReviewContainer>
            { reviews && <GetReview reviews={reviews}/> }
          </ReviewContainer>
        </Destination>
      </Line>
    </Home>
  );
}
const PostReviewContainer = styled.div`
  .place-review {
    text-decoration: none;
    cursor: pointer;
  }
`;
