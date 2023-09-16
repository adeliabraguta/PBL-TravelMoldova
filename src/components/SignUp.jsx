import styled from "styled-components";
import {Link} from "react-router-dom";
import {Banner, Desc, Home, Line, Title} from "../Styles/Banner.js";
import {useEffect} from "react";

export default function SignUp() {

    return (<>
            <ImageContainer>
                <Banner className={"banner"}>
                    <Title>
                        Create Your Account
                    </Title>
                    <Desc>
                        Join Travel Moldova
                    </Desc>
                    <form className={"form"}>
                        <div className={'user-country'}>
                        <div className={"form_section"}>
                            <label className={"label"}>Username</label>
                            <input className={"input"} type={"text"} placeholder={"Choose a username"}/>
                        </div>
                        <div className={"form_section"}>
                            <label className={"label"}>Country</label>
                            <input className={"input"} type={"password"} placeholder={"Enter your country"}/>
                        </div>
                        </div>
                        <div className={"form_section"}>
                            <label className={"label"}>Email Address</label>
                            <input className={"input"} type={"email"} placeholder={"Enter your email"}/>
                        </div>

                        <div className={"form_section"}>
                            <label className={"label"}>Password</label>
                            <input className={"input"} type={"password"} placeholder={"Choose a password"}/>
                        </div>
                        <div className={"terms"}>
                            <input type={"checkbox"}/>
                            <label className={"terms-text"}>I have read and agree with the Terms of use, Client
                                Agreement and Privacy Policy</label>
                        </div>
                        <button className={"btn"}>Create Account</button>
                        <div className={"log-in"}>
                            <span className={'login-text'}>Already have an account?</span><Link className={"link-login"}
                                                                                                to={"/signIn"}>Sign In</Link>
                        </div>
                    </form>
                </Banner>

            </ImageContainer>

        </>

    )
}

export const ImageContainer = styled.div`
  position: relative;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

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

  .banner {
    background-color: rgba(255, 255, 255, 1); /* White background with full opacity */
    position: relative; /* Add this to establish a new stacking context */
    z-index: 1;
    padding: 48px;
    display: flex;
    flex-direction: column;
    max-width: 400px;
  }

  .form {
    align-self: flex-start;
    padding-top: 24px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 100%;
  }
  .user-country{
    display: flex;
    gap: 24px;
  }

  .form_section {
    display: flex;
    flex-direction: column;
    gap: 8px;

    .label {
      color: var(--color-blue-0);
      font-weight: 600;
      font-size: 18px;
    }

    .input {
      padding: 12px 12px;
      border: 1.5px solid var(--color-grey-8);

      &::placeholder {
        color: var(--color-grey-5);
      }
    }
  }

  .terms {
    display: flex;
    gap: 8px;

    .terms-text {
      color: var(--color-grey-5);
      font-size: 16px;

    }
  }

  .btn {
    background-color: var(--color-green-2);
    border: none;
    padding: 12px;
    color: white;
    font-size: 20px;
    letter-spacing: 1.1px;
    cursor: pointer;
    transition: 0.3s ease;

    &:hover {
      background-color: var(--color-green-4);
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
      color: var(--color-blue-0);
      text-decoration: none;
      font-weight: 600;
      transition: 0.3s ease;

      &:hover {
        color: var(--color-blue-5)
      }
    }
  }



`