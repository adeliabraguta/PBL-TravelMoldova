import React, { useEffect, useRef, useState } from "react";
import { Home, Line, Banner, Title, Desc } from "../Styles/Banner.js";
import DestinationComponent from "./DestinationComponent.jsx";
import styled from "styled-components";
import { useGetDestinationsQuery } from "../app/services/apiService.js";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import Loading from "./UI/Loading.jsx";
import { Link as ScrollLink } from "react-scroll";
import { useSelector } from "react-redux";
import { selectSearchState } from "../features/searchDestination/searchSlice.js";

export default function DestinationsPage() {
  const [page, setPage] = useState(1);
  const { search, type, rating } = useSelector(selectSearchState);

  const { data, isLoading, isFetching, isError, error } =
    useGetDestinationsQuery({ page: page, limit: 6, search, type, rating });

  const pages = data
    ? Array.from({ length: data.totalPages }, (_, i) => i + 1)
    : [];

  if (isLoading || isFetching) {
    return <Loading />;
  }

  if (isError) {
    return <div>{error.status}</div>;
  }
  if (data.data.length === 0) {
    return (
      <Home id={"top"}>
        <Destinations>
          <Line>
            <Banner>
              <Desc>TRAVEL NOW</Desc>
              <Title>Moldova's Popular Destinations</Title>
            </Banner>
          </Line>
          <List>
            <p>
              At the moment there are no destinations according to your
              requirements. <b>Please come back later</b>
            </p>
          </List>
        </Destinations>
      </Home>
    );
  }

  return (
    <Home id={"top"}>
      <Destinations>
        <Line>
          <Banner>
            <Desc>TRAVEL NOW</Desc>
            <Title>Moldova's Popular Destinations</Title>
          </Banner>
        </Line>

        <List>
          {data.data.map((destination) => (
            <DestinationComponent
              key={destination._id}
              destination={destination}
            />
          ))}
        </List>
        <Pagination>
          <ScrollLink to="top" spy={true} smooth={true} duration={200}>
            <button
              className={"btn"}
              disabled={page <= 1}
              onClick={() => setPage((prev) => prev - 1)}
            >
              <IoChevronBack className={"icon"} />
            </button>
          </ScrollLink>
          {pages.map((page, index) => (
            <button
              key={index}
              className={`btn btn-page ${
                data.currentPage === page ? "btn-active" : ""
              }`}
              onClick={() => setPage(page)}
            >
              <span>{page}</span>
            </button>
          ))}

          <ScrollLink to="top" spy={true} smooth={true} duration={200}>
            <button
              className={"btn"}
              disabled={page >= data.totalPages}
              onClick={() => setPage((prev) => prev + 1)}
            >
              <IoChevronForward className={"icon"} />
            </button>
          </ScrollLink>
        </Pagination>
      </Destinations>
    </Home>
  );
}

const Destinations = styled.div`
  min-height: 70vh;
  padding: 0px 96px;
`;
export const List = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 64px;
  transition-property: box-shadow, transform;
  transition: 0.3s ease;
  will-change: box-shadow, transform;

  p {
    font-size: 18px;
    grid-column: 1/4;
    text-align: center;
  }
`;
const Pagination = styled.div`
  padding-top: 24px;
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: center;
  padding-bottom: 96px;

  .btn {
    cursor: pointer;
    background-color: white;
    padding: 8px;
    color: var(--color-blue-7);
    border: none;
    transition: 0.3s ease;
    font-weight: 600;
    letter-spacing: 1.1px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:disabled {
      cursor: auto;
      color: var(--color-grey-7);

      &:hover {
        color: var(--color-grey-7);
      }
    }

    &:hover {
      color: var(--color-blue-5);
    }

    .icon {
      height: 24px;
      width: 24px;
    }
  }

  .btn-page {
    border: none;
    color: var(--color-blue-8);
    border-bottom: 2px solid var(--color-blue-8);

    &:hover {
      border: none;
      color: var(--color-blue-5);
      border-bottom: 2px solid var(--color-blue-5);
    }

    span {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 24px;
      width: 24px;
      font-size: 16px;
    }
  }

  .btn-active {
    color: var(--color-blue-5);
    border-bottom: 2px solid var(--color-blue-5);
  }
`;
