import styled from "styled-components";
import {Link, useNavigate} from "react-router-dom";
import {Banner, Desc, Home, Line, Title} from "../../Styles/Banner.js";
import React, {useCallback, useEffect, useState} from "react";
import {useRegisterUserMutation} from "../../app/services/apiService.js";
import {useDispatch} from "react-redux";
import {setCredentials} from "./authSlice.js";

export default function SignUp() {
    const [register, {isSuccess, error, isError, data}] = useRegisterUserMutation()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [terms, setTerms] = useState(false)
    const [email, setEmail] = useState('')
    const [isPasswordTouched, setIsPasswordTouched] = useState(false);

    const parser = new DOMParser();
    const document= parser.parseFromString(error?.data, 'text/html')
    const errorMessage = document.querySelector('p')?.textContent
    const getEnabledStatus = (inputValue) => inputValue.length > 0;
    const enabledUsername = getEnabledStatus(username);
    const enabledEmail = getEnabledStatus(email);
    const enabledPassword = getEnabledStatus(password);
    const enabledConfirmPassword = getEnabledStatus(confirmPassword);

    const enabled =
        username.length > 0 &&
        password.length > 7 && confirmPassword.length > 7 && terms === true

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (isSuccess) {
            dispatch(setCredentials({...data, username, password, email}))
            navigate("/signUp/verificationEmail")
        }
    }, [isSuccess])
    const handleMessage = () => {
        setIsPasswordTouched(true);
    }

    const handleSubmit = useCallback((e) => {
        e.preventDefault()
        register({username, password, email});

    }, [username, password]);

    const handleUserInput = (e) => setUsername(e.target.value)
    const handlePasswordInput = (e) => setPassword(e.target.value)
    const handleConfirmPasswordInput = (e) => {
        setConfirmPassword(e.target.value)
    }
    const handleEmailInput = (e) => setEmail(e.target.value)
    const handleTermsInput = (e) => setTerms(current => !current)
    return (<>
            <ImageContainer>
                <Banner className={"banner"}>
                    <Title>
                        Create Your Account
                    </Title>
                    <Desc>
                        Join Travel Moldova
                    </Desc>
                    <div className={"not-confirmed"}>
                        {isError && errorMessage}
                    </div>
                    <form className={"form"} onSubmit={handleSubmit}>
                        <div className={"form_section"}>
                            <div className={'label-div'}>
                                <label className={"label"}>Username </label>
                                {!enabledUsername ? <span>&#42;Required</span> : ''}
                            </div>
                            <input onChange={handleUserInput} value={username} className={"input"}
                                   type={"text"} placeholder={"Choose a username"}/>
                        </div>
                        <div className={"form_section"}>
                            <div className={'label-div'}>

                            <label className={"label"}>Email Address </label>
                                {!enabledEmail ? <span>&#42;Required</span> : ''}
                        </div>
                            <input className={"input"} value={email} onChange={handleEmailInput} type={"email"} placeholder={"Enter your email"}/>
                        </div>

                        <div className={"form_section"}>
                            <div className={'label-div'}>

                                <label className={"label"}>Password </label>
                                {!enabledPassword ? <span>&#42;Required</span> : ''}
                            </div>
                            <input onChange={handlePasswordInput} onBlur={handleMessage} value={password} className={"input"}
                                   type={"password"} placeholder={"Choose a password"} name="new-password"
                                   autoComplete="new-password"/>
                            {isPasswordTouched && password.length < 7 ? (
                                <div className={"not-confirmed"}>Password must have at least 7 characters</div>
                            ) : ''}
                        </div>
                        <div className={"form_section"}>
                            <div className={'label-div'}>

                                <label className={"label"}>Confirm Password </label>
                                {!enabledConfirmPassword ? <span>&#42;Required</span> : ''}
                            </div>
                            <input className={"input"}
                                   type={"password"} placeholder={"Repeat password"}
                                   onChange={handleConfirmPasswordInput}/>
                            {confirmPassword !== password ? <div className={'not-confirmed'}>Confirm password is not matched</div> : ''}

                        </div>
                        <div className={"terms"}>
                            <input type={"checkbox"} value={terms} onChange={handleTermsInput}/>
                            <label className={"terms-text"}>I have read and agree with the Terms of use, Client
                                Agreement and Privacy Policy</label>
                        </div>
                        <button className={"btn"} disabled={!enabled} >Create Account</button>
                        <div className={"log-in"}>
                            <span className={'login-text'}>Already have an account?</span><Link className={"link-login"}
                                                                                                to={"/signIn"}>Sign
                            In</Link>
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
    background-color: rgba(255, 255, 255, 1);
    z-index: 1;
    padding: 48px 96px;
    display: flex;
    flex-direction: column;
    max-width: 30vw;

  }

  .form {
    align-self: flex-start;
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
  }

  .form_section {
    display: grid;
    flex-direction: column;
    grid-template-rows: 0.1fr 1fr 0.3fr;
    gap: 8px;

    .label-div {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .label {
        color: var(--color-blue-0);
        font-weight: 600;
        font-size: 18px;

      }

      span {
        padding-left: 4px;
        font-size: 14px;
        color: var(--color-grey-6);
        font-weight: 400;
        text-align: end;
      }
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

  .not-confirmed {
    display: block;
    font-weight: 400;
    font-size: 14px;
    color: #ff0044;
    height: 14px;
  }
  .expired{
    opacity: 0.5;
    cursor: not-allowed;
    
    .label{
      cursor: not-allowed;
    }
    .input{
      cursor: not-allowed;
    }
  }
  .disable{
    visibility: hidden;
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

    &:disabled {
      background-color: var(--color-grey-4);
      cursor: not-allowed;

      &:hover {
        background-color: var(--color-grey-4);
      }
    }

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