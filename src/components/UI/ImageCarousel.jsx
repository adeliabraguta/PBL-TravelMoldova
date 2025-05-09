import React, {useEffect, useState} from "react";
import {IoIosArrowForward} from "react-icons/io";
import {IoIosArrowBack} from "react-icons/io"
import styled from "styled-components";

export default function ImageCarousel({destination}) {

    const [slide, setSlide] = useState(0);
    const nextSlide = () => {
        setSlide(slide === destination.length - 1 ? 0 : slide + 1)
    }
    const prevSlide = () => {
        setSlide(slide === 0 ? destination.length - 1 : slide - 1)

    }

    return (
        <>
            <CarouselComponent>{destination.map((img, index) => {
                return (
                    <div key={index} className={slide === index ? `slide active` : 'slide'}>
                        {index === slide && (<img src={`http://localhost:3000/${img}`}
                                                  alt={img.alt}
                                                  key={index}
                                                  className={"img"}/>)}

                    </div>
                )
            })}
                <div className={"nav"}>
                    <div className={"btn"}>
                        <IoIosArrowBack className={"btn_icon"} onClick={prevSlide}/>
                    </div>
                    <div className={"btn"}>
                        <IoIosArrowForward className={"btn_icon"} onClick={nextSlide}/>
                    </div>
                </div>
                <div className={"pagination"}>
                    {destination.map((_, index) => {
                        return (
                            <span key={index} onClick={() => setSlide(index)}
                                  className={index === slide ? "active" : ""}></span>
                        )
                    })}
                </div>

            </CarouselComponent>

        </>

    )
}
const CarouselComponent = styled.div`
  position: relative;
  justify-content: center;
  align-content: center;


  .slide {
    opacity: 0.5;
    transition: opacity 1s ease;
  }

  .slide.active {
    opacity: 1;
    transition: opacity 1s ease;

  }
}

.img {
  aspect-ratio: 5/3;
  height: 100%;
  width: 60vw;
  object-fit: cover;
  transition: 0.3s ease;
}

.nav {
  .btn {
    position: absolute;
    padding: 0 16px;
    transition: transform .2s;
    top: 50%;
    cursor: pointer;

    &:nth-of-type(1) {
      transform: translate(0%, -50%);
      left: 10px;
    }

    &:nth-of-type(2) {
      transform: translate(0%, -50%);
      right: 10px;
    }
  }

  .btn_icon {
    color: white;
    height: 40px;
    width: 40px;
    transition: transform .2s;

    &:hover {
      transform: scale(1.3);
    }
  }
}

.pagination {
  position: absolute;
  bottom: 24px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;

  span {
    cursor: pointer;
    width: 12px;
    height: 12px;
    background-color: #F0F4F8;
    color: transparent;
    border-radius: 50%;
    box-shadow: 0 0 5px 0 rgba(33, 35, 38, 0.06);
    font-size: 12px;
  }

  .active {
    background-color: #2680C2;
  }

`
