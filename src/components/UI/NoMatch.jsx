import {Home, Title} from "../../Styles/Banner.js";
import {useNavigate, useNavigation} from "react-router-dom";
import styled from "styled-components";
import {IoChevronForwardOutline} from "react-icons/io5";

const Button = styled.button`
  background-color: white;
  border: none;
  cursor: pointer;
  color: var(--color-green-4);
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  &:hover{
    color: var(--color-green-2);
  }
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70vh;
  gap: 24px;
`;

export default function NoMatch() {

    const navigate = useNavigate()
    return (

        <Container>
            <Title> Page not Found :(</Title>
            <Button onClick={() => navigate(-1)}>Go Back<IoChevronForwardOutline/></Button>
        </Container>

    )
}
