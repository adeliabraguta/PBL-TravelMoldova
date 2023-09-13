import {Home, Title} from "../Styles/Banner.js";
import {useNavigate, useNavigation} from "react-router-dom";
import styled from "styled-components";

const Button = styled.button`
  background-color: white;
  border: none;
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh
`;

export default function NoMatch() {

    const navigate = useNavigate()
    return (

        <Container>
            <Title> No destination found :(</Title>
            <Button onClick={() => navigate(-1)}>Go Back</Button>
        </Container>

    )
}