import Carousel from "./UI/Carousel.jsx";
import {slides} from "./Data/carouselData.json"
import React, {useEffect, useState} from "react";
import DestinationComponent from "./DestinationComponent.jsx";
import {Home, Line, Banner, Title, Desc} from '../Styles/Banner.js'
import styled from "styled-components";
import InformationComponent from "./UI/InformationComponent.jsx";
import informationData from "./Data/Information.json";
import testimonialsData from "./Data/Information.json";
import TestimonialsComponent from "./UI/TestimonialsComponent.jsx";

import Data from "./Data/Information.json";
import {useGetDestinationsQuery} from "../app/services/apiService.js";
import Loading from "./UI/Loading.jsx";

export default function HomePage() {
    const [information, setInformation] = useState(informationData.accordion)
    const [testimonials, setTestimonials] = useState(testimonialsData.testimonials)

    const {
        data: destinations = [],
        isLoading,
        isFetching,
        isError,
        error
    } = useGetDestinationsQuery();

    if (isLoading || isFetching) {
        return (
            <Loading/>
        )
    }
    return (
        <Home>
            <Line>
                <Banner>
                    <Desc>
                        TRAVEL FOR GOOD
                    </Desc>
                    <Title>
                        Moldova is Out There
                    </Title>
                </Banner>
            </Line>

            <Carousel data={slides}/>
            <PopularDestinations>
                <div className={"popular-destinations"}>
                    <p className={"desc"}>
                        POPULAR DESTINATIONS
                    </p>
                    <ul className={"destinations"}>
                        <li className={"element"}>
                            Tipova Monastery
                        </li>
                        <li className={"element"}>
                            Saharna
                        </li>
                        <li className={"element"}>
                            Capriana Monastery
                        </li>
                        <li className={"element"}>
                            Soroca Fortress
                        </li>
                        <li className={"element"}>
                            Old Orhei
                        </li>
                        <li className={"element"}>
                            Purcari Winery
                        </li>
                    </ul>
                </div>
            </PopularDestinations>

            <TravelDestinations>

                <div className={"guide"}>
                    <h1 className={"title"}>
                        Travel Destinations
                    </h1>
                </div>
                <div className={"guides"}>
                    <p className={"about"}>Despite its small area, small population,
                        Moldova has a fairly rich history and culture.
                        Attractions of Moldova are unique in its kind,
                        and each of them deserves attention. During its existence,
                        the country has gone through several historical transformations.
                        What to see in Moldova is described below. </p>
                    {/*<h2 className={"title"}>*/}
                    {/*    FEATURED TRAVEL DESTINATIONS*/}
                    {/*</h2>*/}
                </div>
                <div className={"list"}>
                    {destinations.map(destination => (
                        <DestinationComponent key={destination.id} destination={destination}/>
                    )).slice(0, 3)}
                </div>
                <div>
                </div>
            </TravelDestinations>


            <Information>
                <ul className="list">
                    <p className="desc">NEED TO KNOW</p>
                    <h1 className="title">Useful information about Moldova</h1>
                    {information.map((info, index) => (
                        <InformationComponent key={index} info={info}/>
                    ))}
                </ul>
            </Information>
            <Testimonial>
                <div className={"testimonials"}>
                    <h1 className={"title"}>What Our Users Say About Us</h1>
                    {testimonials.map((testimonial, index) => (
                        <TestimonialsComponent className={"testimonial-item"} key={index} testimonial={testimonial}/>
                    ))}
                </div>
            </Testimonial>
        </Home>
    )
}
const PopularDestinations = styled.div`
  .popular-destinations {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 48px 0;

    .desc {
      margin: 0;
      color: #079A82;
      letter-spacing: 1.5px;
      font-size: 14px;
      font-weight: 600;
      padding: 0 96px;
    }

    .destinations {
      list-style: none;
      display: flex;
      gap: 12px;

      .element {
        border-right: solid #BCCCDC;
        margin: 0;
        padding-right: 12px;
        color: #627D98;

        &:last-of-type {
          border: none;
        }
      }
    }
  }
`
const TravelDestinations = styled.div`
  .guide {
    box-shadow: inset 0 10px 10px -10px rgba(33, 35, 38, 0.05),
    inset 0 -10px 10px -10px rgba(33, 35, 38, 0.05);
    background-color: #F0F4F8;
    margin-bottom: 96px;

    .title {
      margin: 0;
      padding: 64px 0;
      color: #003E6B;
      font-weight: 600;
      font-size: 30px;
      text-align: center;
    }
  }

  .guides {
    padding: 0 96px;

    .about {
      margin: 0 64px 96px 64px;
      padding: 0 64px;
      text-align: center;
      font-size: 18px;
      border-right: solid #BCCCDC;
      border-left: solid #BCCCDC;
      display: flex;
      align-items: center;
    }

    .title {
      display: flex;
      align-items: flex-start;
      margin: 0;
      padding: 0 0 48px 0;
      color: #102A43;
      letter-spacing: 1.2px;
    }
  }

  .list {
    padding: 0 96px 96px 96px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 64px;
    transition-property: box-shadow, transform;
    transition: 0.3s ease;
    will-change: box-shadow, transform;
  }

`
const Testimonial = styled.div`
  box-shadow: inset 0 10px 10px -10px rgba(33, 35, 38, 0.05),
  inset 0 -10px 10px -10px rgba(33, 35, 38, 0.05);
  background-color: #F0F4F8;
  margin-bottom: 96px;
  padding: 48px 96px 48px 96px;
  display: flex;
  align-content: center;
  justify-content: center;

  .testimonials {
    width: 60vw;
    display: grid;
    grid-template-columns: 1fr 1fr;

    gap: 48px;

    .title {
      align-self: center;
      margin: 0;
      padding: 48px 0;
      color: #003E6B;
      font-weight: 600;
      font-size: 44px;
      text-align: center;
    }

  }


`
const Information = styled.div`
  padding: 0px 48px 96px 48px;
  display: flex;
  justify-content: center;
  align-items: center;

  .list {
    list-style-type: none;

    .desc {
      margin: 0;
      color: #079A82;
      letter-spacing: 1.5px;
      font-size: 14px;
      font-weight: 600;
      text-align: center;
    }

    .title {
      text-align: center;
      font-size: 24px;
      padding-bottom: 48px;
      margin: 0;
    }

    .grid {
      max-width: 60vw;
    }
  }
`

