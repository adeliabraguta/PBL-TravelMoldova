import {useState} from "react";
import styled from "styled-components";

export default function TestimonialsComponent({testimonial}) {
    return (
        <Testimonials>
                <img className={"img"} src={`../assets/${testimonial.img}`} alt={"testimonial=img"}/>
            <div>
                <h1>{testimonial.name}</h1>
                <p>{testimonial.stars}</p>
            </div>
        </Testimonials>
    )
}
const Testimonials = styled.div`
  background-color: white;
  padding: 24px;
  display: grid;
  grid-template-columns: 1fr 1fr;

    .img {
      height: 100px;
      width: 100px;
      object-fit: cover;
  }
`