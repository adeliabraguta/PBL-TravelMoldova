import styled from "styled-components";
import { boolean } from "yup";

export const AuthContainer = styled.div`
    position: fixed;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 2;
    height: 100vh;
    width: 100vw;
`;

export const Auth = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    display: grid;
    grid-template-columns: 1fr;
    justify-content: center;
    background-color: white;

    .auth_section {
        background-color: transparent;
        padding: 48px 96px;
        display: flex;
        flex-direction: column;
    }
    .close_btn{
        position: absolute;
        background-color: transparent;
        border: none;
        right: 24px;
        top: 24px;
        cursor: pointer;
        z-index: 3;
        color: var(--color-grey-0);
        font-size: 24px;
        transition: 0.3s all ease;
        &:hover{
            color: var(--color-grey-3);
        }
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
            cursor: pointer;
            color: var(--color-blue-0);
            text-decoration: none;
            font-weight: 600;
            transition: 0.3s ease;

            &:hover {
                color: var(--color-blue-5);
            }
        }
    }
`

export const Form = styled.form`
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
`;
