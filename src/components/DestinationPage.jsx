import {Banner, Desc, Home, Line, Title} from "../Styles/Banner.js";
import {useLocation, useParams} from "react-router-dom";
import {IoLocationOutline} from "react-icons/io5";
import styled from "styled-components";

export default function DestinationPage(){

    return(
    <Home>
        <Line>
            <Destination>
            <div className={"destination"}>
                <Banner >
                    <Desc >DISCOVER NOW</Desc>
                    <Title >Princely Forest Na  ture Reserve</Title>
                </Banner>
                <p className={"information"}>Founded in 1993, this is the largest natural reserve in Moldova and is located in Glodeni. Here you’ll find the country’s oldest stand of old-growth oak tree where the oldest oak is estimated to be about 450 years old. Nature lovers will enjoy the many bird species with the most notable being the herons that nest near the river.  Discover the area known as “One Hundred Hills,” a landscape of rolling knolls – that no one understands how they were formed. Padurea Domneasca is a great way to spend a day outdoors with Mother Nature."</p>

            </div>
            <div className={"carousel_section"}>
                <div className={"carousel"}>
                    <img className={"img"} src="/assets/padureadomneasca3.jpg" alt="image"/>
                    <img className={"img"} src="/assets/padureadomneasca.jpg" alt="image"/>

                    <img className={"img"} src="/assets/padureadomneasca2.jpg" alt="image"/>
                    <img className={"img"} src="/assets/padureadomneasca3.jpg" alt="image"/>


                </div>
            </div>
            <div className={"location"}>
                <IoLocationOutline
                    className={"icon"}
                />
                <p className={"address"}>
                    Glodeni and Falesti districts
                </p>
            </div>
            </Destination>
        </Line>
    </Home>
        )
}
const Destination =styled.div`
  .carousel_section {
    display: flex;
    align-content: center;
    justify-content: center;
    .carousel {
      margin: 0;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 48px;
      align-content: center;
      justify-content: center;
      .img {
        height: 40vh;
        width: 100%;
        object-fit: cover;
        transition: 0.3s ease;
        //&:hover{
        //  transform: scale(1.5);
        //  height: 100%;
        //  width: 100%;
        //}
      }
    }
  }
  .destination {
    display: grid;
    grid-template-columns: 1fr;
    padding: 48px 96px 24px 96px;
    align-items: center;
    justify-items: center;
    .description {
      padding: 0 48px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .desc{
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
    //border-right: solid #D9E2EC;
    //border-left: solid #D9E2EC;
    padding:0 48px 32px 48px;
    text-align: center;
  }
  .location {
    padding: 32px 16px 96px 16px;
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
    `