import {IoLocationOutline, IoArrowForwardOutline} from "react-icons/io5";
import {Link} from "react-router-dom";
import styled from "styled-components";

export default function DestinationComponent({destination}) {
    return (
        <div>
            <Destination>
                <Link className={"link"} to={`/posts/${destination.slug}`} >
                    <div className={"img-container"}>
                        <img
                            className={"img"}
                            src={`http://127.0.0.1:5000${destination?.images[0]}`}
                        />
                    </div>

                    {/*<div className={"see"}>*/}
                    {/*    <p>See More</p>*/}
                    {/*    <IoArrowForwardOutline></IoArrowForwardOutline>*/}
                    {/*</div>*/}
                </Link>
                <div className={"desc"}>
                    <Link className={"link"} to={`/posts/${destination.slug}`} >
                    <h2 className={"title"}>
                        {destination.title}
                    </h2>
                    </Link>
                </div>
                <div className={"location"}>
                    <IoLocationOutline
                        className={"icon"}
                    />
                    <p className={"address"}>
                        {destination.address}
                    </p>
                </div>
            </Destination>
        </div>
    )
}
const Destination= styled.div`

  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;

  .img-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    &:hover .img{
      transform: scale(1.1);
    }
  }

  .img {
    transition: transform .5s ease;
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: relative;
  }
  .link{
    text-decoration: none;
  }
  .desc {
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: space-between;

    .route {
      text-decoration: none;
    }

    .title {
      color: var(--color-grey-3);
      margin: 0;
      font-weight: 600;
      font-size: 20px;

      &:active,
      &:hover {
        color: #243B53;
      }
    }

    .icon {
      height: 24px;
      width: 24px;
      color: var(--color-grey-7);

      cursor: pointer;

      &:hover {
        color: var(--color-grey-6);


      }
    }

    .icon.active {
      color: var(color-blue-4);

    }
  }

  .location {
    display: flex;
    align-items: center;
    align-content: center;
    gap: 16px;
    //border-bottom: solid #D9E2EC;
    padding-bottom: 16px;

    .icon {
      color: var(--color-green-3);
    }

    .address {
      margin: 0;
      font-weight: 300;
      font-style: italic;
      color: var(--color-grey-0);
      font-size: 16px;
    }
  }

`