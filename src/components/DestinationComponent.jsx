import { IoLocationOutline, IoArrowForwardOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IoIosHeart } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { setFavourite } from "./UI/favSlice.js";
import { useDispatch } from "react-redux";
import { useState } from "react";

export default function DestinationComponent({ destination }) {
  const dispatch = useDispatch();
  const favState = Boolean(
    localStorage.getItem("favouriteDestinations") &&
      JSON.parse(localStorage.getItem("favouriteDestinations")).find(
        (item) => item.slug === destination.slug,
      ),
  );
  const [isFav, setIsFav] = useState(favState);
  const [isMessage, setIsMessage] = useState(false);

  const toggleFav = () => {
    dispatch(setFavourite(destination));
    setIsFav(!isFav);
  };

  const displayMessage = () => {
    setIsMessage(true);
  };
  const hideMessage = () => {
    setIsMessage(false);
  };

  return (
    <div>
      <Destination>
        <Link className={"link"} to={`/posts/${destination.slug}`}>
          <div className={"img-container"}>
            <img
              className={"img"}
              src={`http://127.0.0.1:5000${destination?.images[0]}`}
              alt={destination.slug}
            />
          </div>
        </Link>
        <div className={"desc"}>
          <Link className={"link"} to={`/posts/${destination.slug}`}>
            <h2 className={"title"}>{destination.title}</h2>
          </Link>
          <div className={"fav-container"}>
            <FaHeart
              className={
                isFav
                  ? "icon_fav icon_fav-active"
                  : "icon_fav icon_fav-inactive"
              }
              onClick={toggleFav}
              onMouseEnter={displayMessage}
              onMouseLeave={hideMessage}
            />

            <p
              className={
                isMessage
                  ? "hover_message hover_message-visible"
                  : "hover_message hover_message-hidden"
              }
            >
              {isFav ? "Remove from favorite" : "Add to favorite"}
            </p>
          </div>
        </div>
        <div className={"location"}>
          <IoLocationOutline className={"icon"} />
          <p className={"address"}>{destination.address}</p>
        </div>
      </Destination>
    </div>
  );
}
const Destination = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;

  .img-container {
    width: 100%;
    height: 100%;
    overflow: hidden;

    &:hover .img {
      transform: scale(1.1);
    }
  }

  .img {
    transition: transform 0.5s ease;
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: relative;
  }

  .link {
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
        color: #243b53;
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

  .fav-container {
    position: relative;

    .icon_fav {
      height: 20px;
      width: 20px;
      transition: all 0.3s ease;
      cursor: pointer;
    }

    .icon_fav-active {
      color: var(--color-green-2);

      &:hover {
        color: var(--color-green-4);
      }
    }

    .icon_fav-inactive {
      color: var(--color-grey-7);

      &:hover {
        color: var(--color-green-4);
      }
    }

    .hover_message {
      margin: 0;
      position: absolute;
      background-color: white;
      padding: 10px 15px;
      width: max-content;
      opacity: 90%;
      color: var(--color-grey-2);
      top: -60px;
      right: -40px;
      box-shadow: rgba(0, 0, 0, 0.07) 0 0 10px 2px;
    }

    .hover_message-visible {
      visibility: visible;
    }

    .hover_message-hidden {
      visibility: hidden;
    }
  }
`;
