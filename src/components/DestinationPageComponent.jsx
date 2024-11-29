import React from "react";
import { IoLocationOutline } from "react-icons/io5";
import { IoMdStar } from "react-icons/io";

const DestinationPageComponent = ({ data }) => {
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
            <div className={"rating"}>
              <IoMdStar className={"icon_star"} />
              <span>{data.rating}</span>
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
                style={{border: 0}}
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
