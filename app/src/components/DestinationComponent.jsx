import {IoLocationOutline, IoArrowForwardOutline, IoStar} from "react-icons/io5";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {IoIosHeart, IoMdStar} from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { selectFavoriteDestinations, setFavourite } from "./UI/favSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { selectIsAuthenticated } from "../features/authentification/authSlice.js";

export default function DestinationComponent({ destination }) {
  const token = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();
  const destinations = useSelector(selectFavoriteDestinations);

  const favState = Boolean(
    destinations.find((item) => item._id === destination._id),
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
        <Link className={"link"} to={`/posts/${destination._id}`}>
          <div className={"img-container"}>
            <img
              className={"img"}
              src={`http://localhost:3000/${destination?.images[0]}`}
              alt={destination._id}
            />
          </div>
        </Link>
        <div className={"desc"}>
          <Link className={"link"} to={`/posts/${destination._id}`}>
            <h2 className={"title"}>{destination.name}</h2>
          </Link>
          <div className={"actions"}>

          <div className={"rating"}>
            <IoMdStar className={"icon_star"} />
            <span>{destination.rating}</span>
          </div>

          {token && (
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
          )}
          </div>

        </div>
        <div className={"location"}>
          <IoLocationOutline className={"icon"} />
          <p className={"address"}>{destination.location}</p>
        </div>
      </Destination>
    </div>
  );
}
const Destination = styled.div`
    width: 100%;
    display: grid;
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
        aspect-ratio: 5/3;
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

        .actions {
            display: flex;
            align-items: center;
            gap: 16px;

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

    }

    .location {
        display: flex;
        align-items: center;
        align-content: center;
        gap: 16px;
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
`;
