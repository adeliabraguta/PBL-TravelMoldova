import {Banner, Desc, Home, Line, Title} from "../Styles/Banner.js";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {IoLocationOutline, IoBookmarkOutline, IoCheckmarkOutline, IoPersonCircleOutline} from "react-icons/io5";
import styled from "styled-components";
import React, {useState} from "react";

import Loading from "./UI/Loading.jsx";
import {useGetDestinationByIdQuery} from "../app/services/apiService.js";
import {Rating, Typography} from "@mui/material";

export default function DestinationPageNoAccount() {
    const [value, setValue] = useState(5);
    const {id} = useParams();
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
    } = useGetDestinationByIdQuery(id)
    const [review, setReview] = useState("")
    const [reviews, setReviews] = useState([])
    if (isLoading || isFetching) {
        return (
            <Loading/>
        )
    }
    if (isError) {
        console.log({error});
        return <div>{error.status}</div>;
    }
    const onChangeHandler = (e) => {
        setReview(e.target.value)
    }
    const onClickHandler = () => {
        setReviews(comments => [...comments, review])
    }

    return (
        <Home>
            <Line>
                <Destination>
                    <div className={"destination"}>
                        <Banner>
                            <Desc>DISCOVER NOW</Desc>
                            <Title>{destination.title}</Title>
                            <div className={"interactions"}>
                                <div className={"interested interact"} onClick={routeChange}>
                                    <IoBookmarkOutline className={"icon"}/>
                                    <span>Not interested</span>

                                </div>
                                <div className={"visited interact"} onClick={routeChange}>
                                    <IoCheckmarkOutline className={"icon"}/>
                                    <span>Not visited</span>
                                </div>
                            </div>
                        </Banner>
                        <p className={"information"}>{destination.generalInformation}</p>

                    </div>
                    <div className={"carousel_section"}>
                        <div className={"carousel"}>
                            <img className={"img"} src={`/assets/${destination.img}`} alt="image"/>
                            <img className={"img"} src={`/assets/${destination.img2}`} alt="image"/>
                            <img className={"img"} src={`/assets/${destination.img3}`} alt="image"/>
                            <img className={"img"} src={`/assets/${destination.img}`} alt="image"/>
                        </div>
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
                            src={destination.map}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>

                    <div className={"reviews"}>
                        <h2 className={"title"}>Reviews</h2>
                        {/*<Typography component="legend">Controlled</Typography>*/}
                        {/*<Rating*/}
                        {/*    name="simple-controlled"*/}
                        {/*    value={value}*/}
                        {/*    onChange={(event, newValue) => {*/}
                        {/*        setValue(newValue);*/}
                        {/*    }}*/}
                        {/*/>*/}
                        <Typography component="legend">Read only</Typography>
                        <Rating name="read-only" value={value} readOnly />

                        <div className={"place-review"} onClick={routeChange}>
                            <IoPersonCircleOutline className={"img"}/>
                            <textarea className={'text-area'} placeholder={"Add a review"}/>
                        </div>
                        <div className={"display-review"}>
                        </div>

                    </div>
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

  .carousel_section {
    display: flex;
    align-content: center;
    justify-content: center;

    .carousel {
      width: 70vw;
      margin: 0;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 48px;
      align-content: center;
      justify-content: center;

      .img {
        height: 100%;
        width: 100%;
        object-fit: cover;
        transition: 0.3s ease;
      }
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
  .map{
    padding-bottom: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    .map-link{
    width: 70vw;
    height: 40vh;
    }
  }

  .reviews {
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
      display: flex;
      gap: 24px;
      cursor: pointer;

      .img {
        height: 70px;
        width: 70px;
        color: var(--color-grey-8);
      }

      .text-area {
        border: none;
        overflow: auto;
        outline: none;
        padding: 12px 20px;
        box-sizing: border-box;
        border-bottom: 2px solid var(--color-blue-0);
        font-size: 16px;
        resize: none;
        width: 60vw;
        cursor: pointer;
        //
        //&:focus{
        //  border-bottom: 2px solid var(--color-blue-5);
        //}
        &:disabled {
          background-color: white;
        }
      }

    }
  }

`