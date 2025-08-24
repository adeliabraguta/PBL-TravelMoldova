import {Banner, Home, Line, Title} from "../../Styles/Banner.js";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {selectCurrentUser} from "./authSlice.js";

export default function UserAccount() {
    const user = useSelector(selectCurrentUser)
    const userName = user.charAt(0).toUpperCase() + user.slice(1)

    return (
        <Home>
            <Line>
                <Account>
                    <img className={"img"} src={"/assets/testimonial2.webp"}/>
                    <div>
                        <Title>Hello, {userName}</Title>
                        <p>Young travel enthusiast</p>
                    </div>
                    <div>
                    </div>
                </Account>
            </Line>
        </Home>
    )
}
const Account = styled.div`
  display: flex;
  gap: 48px;
  align-items: center;
  align-content: center;
  padding: 48px 48px 96px 48px;

  .img {
    height: 200px;
    width: 200px;
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