import {Banner, Home, Line, Title} from "../../Styles/Banner.js";
import styled from "styled-components";

export default function UserAccount() {
    return (
        <Home>
            <Line>
                <Account>
                        <img className={"img"} src={"/assets/testimonial2.webp"}/>
                    <div>
                    <Title>Adelia157</Title>
                        <div className={'country'}>
                            <h2>Country</h2>
                            <p>Moldova</p>
                        </div>
                    </div>
                    <div>

                    </div>
                </Account>
            </Line>
        </Home>
    )
}
const Account=styled.div`
  display: flex;
  gap: 48px;
  align-items: center;
  align-content: center;
  padding: 48px 48px 96px 48px;

  .img {
    height: 150px;
    width: 150px;
    object-fit: cover;
  }

  .country {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 24px;

    h2 {

    }
  }
`