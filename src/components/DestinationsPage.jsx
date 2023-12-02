import React, {useEffect, useRef, useState} from "react";
import {Home, Line, Banner, Title, Desc} from '../Styles/Banner.js'
import DestinationComponent from "./DestinationComponent.jsx";
import styled from "styled-components";
import {useGetDestinationsQuery} from "../app/services/apiService.js";
import {IoChevronBack, IoChevronForward} from "react-icons/io5";
import Loading from "./UI/Loading.jsx";
import {Link as ScrollLink} from "react-scroll";

export default function DestinationsPage() {

    const [page, setPage] = useState(1)
    const {
        data: destinations = [],
        isLoading,
        isFetching,
        isError,
        error
    } = useGetDestinationsQuery(page);

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
        <Home id={"top"}>
            <Destinations>
                <Line>
                    <Banner>
                        <Desc>
                            TRAVEL NOW
                        </Desc>
                        <Title>
                            Moldova's Popular Destinations
                        </Title>
                    </Banner>
                </Line>

                <List>
                    {destinations.map(destination => (
                        <DestinationComponent key={destination.slug} destination={destination}/>
                    ))}
                </List>
                <Pagination>
                    <ScrollLink to="top"
                                spy={true}
                                smooth={true}
                                duration={200}>
                        <button className={"btn"}
                                disabled={page <= 1}
                                onClick={() => setPage(prev => prev - 1)}><IoChevronBack
                            className={"icon"}/></button>
                    </ScrollLink>
                    <ScrollLink to="top"
                                spy={true}
                                smooth={true}
                                duration={200}>
                        <button className={"btn"}
                                disabled={page >= 1}
                                onClick={() => setPage(prev => prev + 1)}><IoChevronForward
                            className={"icon"}/></button>
                    </ScrollLink>
                </Pagination>
            </Destinations>
        </Home>
    )
}

const Destinations = styled.div`
  min-height: 70vh;
`
const List = styled.div`
  padding: 24px 128px 24px 128px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 64px;
  transition-property: box-shadow, transform;
  transition: 0.3s ease;
  will-change: box-shadow, transform;
`
const Pagination = styled.div`
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
    border: 2px solid var(--color-blue-7);
    transition: 0.3s ease;
    font-weight: 600;
    letter-spacing: 1.1px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:disabled {
      cursor: auto;
      color: var(--color-grey-7);
      border: 2px solid var(--color-grey-7);

      &:hover {
        color: var(--color-grey-7);
        border: 2px solid var(--color-grey-7);
      }
    }

    &:hover {
      color: var(--color-blue-5);
      border: 2px solid var(--color-blue-5);

    }

    .icon {
      height: 24px;
      width: 24px;
    }
  }
`