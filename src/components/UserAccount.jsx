import {Banner, Home, Line, Title} from "../Styles/Banner.js";
import styled from "styled-components";

export default function UserAccount() {
    return (
        <Home>
            <Line>
                <Account>
                        <img className={"img"} src={"/assets/padureadomneasca3.jpg"}/>
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
  justify-content: center;
  align-items: center;
  align-content: center;
  padding-bottom: 96px;

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