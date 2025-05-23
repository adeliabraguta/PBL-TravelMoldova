import Carousel from "./UI/Carousel.jsx";
import { slides } from "./Data/carouselData.json";
import React, { useEffect, useState } from "react";
import DestinationComponent from "/src/components/DestinationComponent";
import { Home, Line, Banner, Title, Desc } from "../Styles/Banner.js";
import styled from "styled-components";
import InformationComponent from "./UI/InformationComponent.jsx";
import informationData from "./Data/Information.json";
import testimonialsData from "./Data/Information.json";
import TestimonialsComponent from "./UI/TestimonialsComponent.jsx";
import { useGetDestinationsQuery } from "../app/services/apiService.js";
import Loading from "./UI/Loading.jsx";
import StoriesComponent from "./UI/StoriesComponent.jsx";
import { useGetStoriesQuery } from "../app/services/apiStories.js";
import { IoChevronForwardSharp } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";

export default function HomePage() {
  const information = informationData.accordion;
  const testimonials = testimonialsData.testimonials;

  const { data, isLoading, isFetching } = useGetDestinationsQuery({
    page: 1,
    limit: 3,
  });

  const { data: stories = [] } = useGetStoriesQuery();
  return (
    <Home>
      <Line>
        <Banner>
          <Desc>TRAVEL FOR GOOD</Desc>
          <Title>Moldova is Out There</Title>
        </Banner>
      </Line>

      <Carousel data={slides} />
      <PopularDestinations>
        <div>
          <p>POPULAR DESTINATIONS</p>
          <ul>
            <li>Tipova Monastery</li>
            <li>Saharna</li>
            <li>Capriana Monastery</li>
            <li>Soroca Fortress</li>
            <li>Old Orhei</li>
            <li>Purcari Winery</li>
          </ul>
        </div>
      </PopularDestinations>

      <TravelDestinations>
        <div className={"guide"}>
          <h1 className={"title"}>Travel Destinations</h1>
        </div>
        <div className={"guides"}>
          <p className={"about"}>
            Despite its small area, small population, Moldova has a fairly rich
            history and culture. Attractions of Moldova are unique in its kind,
            and each of them deserves attention. During its existence, the
            country has gone through several historical transformations. What to
            see in Moldova is described below.{" "}
          </p>
        </div>
        {isLoading || isFetching ? (
          <Loading />
        ) : (
          <>
            <div className={"list"}>
              {data.data
                .map((destination) => (
                  <DestinationComponent
                    key={destination._id}
                    destination={destination}
                  />
                ))
                .slice(0, 3)}
              <NavLink className={"more"} to={"/posts"}>
                See more <IoChevronForwardSharp />
              </NavLink>
            </div>
          </>
        )}
        <div></div>
      </TravelDestinations>

      <Testimonial>
        <div className={"testimonials"}>
          <h1 className={"title"}>What Our Users Say About Us</h1>
          {testimonials.map((testimonial, index) => (
            <TestimonialsComponent
              className={"testimonial-item"}
              key={index}
              testimonial={testimonial}
            />
          ))}
        </div>
      </Testimonial>
      <Information>
        <Banner>
          <Desc>NEED TO KNOW</Desc>
          <Title>Useful information about Moldova</Title>
        </Banner>
        <div className={"info_container"}>
          <ul className="list">
            {information.map((info, index) => (
              <InformationComponent key={index} info={info} />
            ))}
          </ul>
          <iframe
            className={"map-link"}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2789019.679401683!2d25.75085015505356!3d46.94887773432135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c97c3628b769a1%3A0x258119acdf53accb!2sMoldova!5e0!3m2!1sen!2s!4v1729965547321!5m2!1sen!2s"
            width="400px"
            height="450px"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </Information>
      {/*<div>*/}
      {/*  <TravelDestinations>*/}
      {/*    <div className={"guide"}>*/}
      {/*      <h1 className={"title"}>Travel Stories</h1>*/}
      {/*    </div>*/}
      {/*  </TravelDestinations>*/}
      {/*  <Stories>*/}
      {/*    <div className="desc-div">*/}
      {/*      <p className="desc">*/}
      {/*        Here you can discover fascinating travel stories from Moldova.*/}
      {/*        This will not leave you indifferent. Moldova is about wonderful*/}
      {/*        nature and interesting adventures.*/}
      {/*      </p>*/}
      {/*    </div>*/}
      {/*    <div className="stories">*/}
      {/*      {stories.map((story, index) => (*/}
      {/*        <StoriesComponent key={index} story={story} />*/}
      {/*      ))}*/}
      {/*    </div>*/}
      {/*  </Stories>*/}
      {/*</div>*/}
    </Home>
  );
}
const PopularDestinations = styled.div`
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 48px 0;

    p {
      margin: 0;
      color: #079a82;
      letter-spacing: 1.5px;
      font-size: 14px;
      font-weight: 600;
      padding: 0 96px;
    }

    ul {
      list-style: none;
      display: flex;
      gap: 12px;

      li {
        border-right: solid #bcccdc;
        margin: 0;
        padding-right: 12px;
        color: #627d98;

        &:last-of-type {
          border: none;
        }
      }
    }
  }
`;
const TravelDestinations = styled.div`
  .guide {
    box-shadow:
      inset 0 10px 10px -10px rgba(33, 35, 38, 0.05),
      inset 0 -10px 10px -10px rgba(33, 35, 38, 0.05);
    background-color: #f0f4f8;
    margin-bottom: 96px;

    .title {
      margin: 0;
      padding: 64px 0;
      color: #003e6b;
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
      border-right: solid #bcccdc;
      border-left: solid #bcccdc;
      display: flex;
      align-items: center;
    }

    .title {
      display: flex;
      align-items: flex-start;
      margin: 0;
      padding: 0 0 48px 0;
      color: #102a43;
      letter-spacing: 1.2px;
    }
  }

  .list {
    padding: 0 96px 96px 96px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 64px;
    row-gap: 24px;
    transition-property: box-shadow, transform;
    transition: 0.3s ease;
    will-change: box-shadow, transform;

    .more {
      font-size: 16px;
      grid-column: 2;
      color: var(--color-grey-4);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
      text-decoration: none;

      &:hover {
        color: var(--color-grey-2);
      }
    }
  }
`;
const Testimonial = styled.div`
  box-shadow:
    inset 0 10px 10px -10px rgba(33, 35, 38, 0.05),
    inset 0 -10px 10px -10px rgba(33, 35, 38, 0.05);
  background-color: #f0f4f8;
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
      color: #003e6b;
      font-weight: 600;
      font-size: 44px;
      text-align: center;
    }
  }
`;
const Information = styled.div`
  padding: 0px 48px 96px 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  .info_container{
    padding-top: 32px;
    display: flex;
    gap: 96px;
    justify-content: center;
    flex-wrap: wrap;
    
  }
`;
const Stories = styled.div`
  padding: 0 96px 96px 96px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 96px;
  justify-content: center;
  align-items: center;

  .desc {
    margin: 0;
    padding: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: solid #bcccdc;
    border-left: solid #bcccdc;
    font-size: 18px;
    text-align: center;
  }

  .stories {
    display: flex;
    flex-direction: column;
    gap: 64px;

    .story {
      align-items: center;
      justify-content: center;
    }
  }
`;
