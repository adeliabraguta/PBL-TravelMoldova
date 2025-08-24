import { Banner, Desc, Home, Line, Title } from "../Styles/Banner.js";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import Loading from "./UI/Loading.jsx";
import {
    useGetDestinationByIdQuery, useGetReviewsQuery,
} from "../app/services/apiService.js";
import { Rating } from "@mui/material";
import PostReview from "../features/reviews/PostReview.jsx";
import DestinationPageComponent from "./DestinationPageComponent.jsx";
import GetReview from "../features/reviews/GetReview.jsx";

export default function DestinationPageNoAccount() {
  const { id } = useParams();
  const { data, isLoading, isFetching, isError, error } =
    useGetDestinationByIdQuery(id);

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
            <PostReview />
            { reviews && <GetReview reviews={reviews} />}
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
        padding-bottom: 64px;
        display: grid;
        grid-template-columns: 1.5fr 1fr;
        grid-template-rows: 1fr 1fr;
        gap: 24px;
        justify-content: center;
    }

    .image {
        height: 200px;
        width: 100%;
        object-fit: cover;

        &:first-of-type {
            grid-column: 1;
            grid-row: 1/3;
            height: 424px;
            width: 700px;
            object-fit: cover;
        }
    }

    .description_container {
        display: grid;
        width: 100%;
        grid-template-columns: 1.5fr 1fr;
        gap: 24px;

        .description {
            h2 {
                font-size: 24px;
                margin: 0;
                color: var(--color-blue-0);
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 24px;
              .interactions{
                display: flex;
                gap: 24px;
                align-items: end;
              }
            }

            p {
                color: #102a43;
                line-height: 1.3;
                text-align: justify;
            }

            .rating {
                display: flex;
                align-items: center;
                justify-content: center;

                span {
                    color: var(--color-grey-1);
                    font-size: 18px;
                }

                .icon_star {
                    width: 24px;
                    height: 24px;
                    color: var(--color-green-2);
                }
            }
        }

        .location {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 24px;

            .icon {
                width: 24px;
                height: 24px;
                color: #2680c2;
            }

            .address {
                color: var(--color-blue-0);
                margin: 0;
                font-weight: 400;
                font-size: 24px;
                font-style: italic;
            }
        }

        .map {
            width: 100%;
            padding-bottom: 96px;
        }
    }
`;
