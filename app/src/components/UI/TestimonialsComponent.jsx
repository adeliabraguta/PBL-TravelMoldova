import {useState} from "react";
import styled from "styled-components";
import {IoStar, IoStarOutline} from "react-icons/io5";

export default function TestimonialsComponent({testimonial}) {
    return (
        <Testimonials>
            <div className={"row-1"}>
                <img className={"img"} src={`../assets/${testimonial.img}`} alt={"testimonial=img"}/>
                <div className={"name-star"}>
                    <h1>{testimonial.name}</h1>
                    <div className={"stars"}>
                        {Array.from({length: parseInt(testimonial.stars)}, (_, index) => (
                            <IoStar className={"star"} key={index}/>
                        ))}
                        {parseInt(testimonial.stars) < 5 && <IoStarOutline className={"star"}/>}
                    </div>
                </div>

            </div>
            <div>

                <p><span>&#8220;</span> {testimonial.review} <span>&#8222;</span></p>
            </div>
        </Testimonials>
    )
}
const Testimonials = styled.div`
  background-color: white;
  padding: 24px;
  display: grid;
  grid-template-columns: 1fr;

  .row-1 {
    display: flex;
    gap: 20px;
    align-items: center;
    justify-content: center;

    .img {
      height: 70px;
      width: 70px;
      border-radius: 50%;
      object-fit: cover;
    }
    .name-star{
      display: flex;
      flex-direction: column;
      gap: 8px;
      
      
    h1 {
      margin: 0;
      color: var(--color-blue-4);
      font-size: 20px;
      letter-spacing: 1.1px;
      font-weight: 400;
    }

    .stars {
      display: flex;

      .star {
        color: var(--color-green-4);
        height: 16px;
        width: 16px;
      }
    }
    }
      
  }

  p {
    text-align: center;
    color: var(--color-grey-0);
    font-style: italic;
    
    span{
      font-weight: 600;
      color: var(--color-grey-4);
    }
  }
`