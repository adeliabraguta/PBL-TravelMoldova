import React, { useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { IoMdStar } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuthenticated } from "../features/authentification/authSlice.js";
import { selectFavoriteDestinations, setFavourite } from "./UI/favSlice.js";

const DestinationPageComponent = ({ data }) => {
  const token = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();
  const destinations = useSelector(selectFavoriteDestinations);

  const favState = Boolean(destinations.find((item) => item._id === data._id));
  const [isFav, setIsFav] = useState(favState);
  const [isMessage, setIsMessage] = useState(false);

  const toggleFav = () => {
    dispatch(setFavourite(data));
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
      <div className={"image_container"}>
        {data?.images.slice(0, 3).map((image, index) => (
          <img
            key={index}
            className={"image"}
            src={`http://localhost:3000/${image}`}
            alt={data.name}
          />
        ))}
        {/*<ImageCarousel destination={data.images} />*/}
      </div>
      <div className={"description_container"}>
        <div className={"description"}>
          <h2>
            About - {data.name}
            <div className={"interactions"}>
              <div className={"rating"}>
                <IoMdStar className={"icon_star"} />
                <span>{data.rating}</span>
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
          </h2>
          <p> {data.description}</p>
        </div>
        <div className={"location"}>
          <p className={"address"}>
            <IoLocationOutline className={"icon"} /> {data.location}
          </p>
          <div className={"map"}>
            <iframe
              className={"map-link"}
              src={data.map}
              width="100%"
              height="300px"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationPageComponent;
