import styled from "styled-components";
import {boolean} from "yup";

export const AuthContainer = styled.div`
  position: relative;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: center;

  &::before {
    content: "";
    height: 100vh;
    width: 100vw;
    position: absolute;
    background-image: url("../assets/carousel1.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    opacity: 0.6;
    z-index: 0;
  }

  .auth_section {
    background-color: rgba(255, 255, 255, 1);
    z-index: 1;
    padding: 48px 96px;
    display: flex;
    flex-direction: column;
    max-width: 30vw;
  }



  .expired {
    opacity: 0.5;
    cursor: not-allowed;

    .label {
      cursor: not-allowed;
    }

    .input {
      cursor: not-allowed;
    }
  }

  .disable {
    visibility: hidden;
  }
  
  .log-in {
    align-self: center;
    display: flex;
    gap: 8px;
    font-size: 16px;

    .login-text {
      color: var(--color-grey-5);
    }

    .link-login {
      color: var(--color-blue-0);
      text-decoration: none;
      font-weight: 600;
      transition: 0.3s ease;

      &:hover {
        color: var(--color-blue-5);
      }
    }
  }
`;
export const Form = styled.form`
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;
export const Field = styled.div`
  display: grid;
  flex-direction: column;
  grid-template-rows: 0.1fr 1fr 0.3fr;
  gap: 8px;
`;
export const Label = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;

  label {
    color: var(--color-blue-0);
    font-weight: 600;
    font-size: 18px;
  }
`;

export const Input = styled.input`
  padding: 12px 12px;
  border: 1.5px solid
    ${({ $isError }) => ($isError ? "#ff0044" : "var(--color-grey-8)")};

  &::placeholder {
    color: var(--color-grey-5);
  }
`;
export const ErrorMessageAuth = styled.span`
  display: block;
  font-weight: 400;
  font-size: 14px;
  color: #ff0044;
  height: 14px;
`