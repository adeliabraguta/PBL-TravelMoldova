import styled from "styled-components";
import {Link, useNavigate} from "react-router-dom";
import {Banner, Desc, Home, Line, Title} from "../../Styles/Banner.js";
import React, {useEffect, useState, useRef, useCallback} from "react";
import {ImageContainer} from "./SignUp.jsx";
import {useLoginUserMutation} from "../../app/services/apiService.js";
import {setCredentials, setUserName} from "./authSlice.js";
import {useDispatch} from "react-redux";
import Loading from "../../components/UI/Loading.jsx";

export default function SignIn() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const getEnabledStatus = (inputValue) => inputValue.length > 0;

    const enabledUsername = getEnabledStatus(username);
    const enabledPassword = getEnabledStatus(password);

    const [login, { isSuccess, isError, error, data}] = useLoginUserMutation()
    const dispatch = useDispatch()
    const parser = new DOMParser();
    const document= parser.parseFromString(error?.data, 'text/html')
    const errorMessage = document.querySelector('p')?.textContent

    const enabled =
        username.length > 0 &&
        password.length > 0;

    useEffect(() => {
        if(isSuccess) {
                dispatch(setCredentials({...data, username}))
                navigate("/")
            }
        },
        [isSuccess]
    )
    const handleSubmit = useCallback((e) => {
        e.preventDefault()
        login({username, password});
    }, [username, password]);

    const handleUserInput = (e) => setUsername(e.target.value)
    const handlePasswordInput = (e) => setPassword(e.target.value)
    return (
        <>
            <ImageContainer>
                <Banner className={"banner"}>
                    <Title>
                        Sign Into Your Account
                    </Title>
                    <Desc>
                        Travel Moldova
                    </Desc>
                    <div className={"not-confirmed"}>
                        {isError && errorMessage }
                    </div>
                    <form className={"form"} onSubmit={handleSubmit} >
                        <div className={"form_section"}>
                            <div className={"label-div"}>
                            <label className={"label"}>Username </label>
                            {!enabledUsername ? <span>&#42;Required</span> : ''}
                            </div>
                            <input value={username} onChange={handleUserInput} className={"input"}
                                   type={"text"} placeholder={"Choose a username"}/>
                        </div>

                        <div className={"form_section"}>
                            <div className={"label-div"}>

                            <label className={"label"} >Password </label>
                                {!enabledPassword ? <span>&#42;Required</span> : ''}
                            </div>
                            <input className={"input"} value={password} onChange={handlePasswordInput}
                                   type={"password"} placeholder={"Choose a password"}/>
                        </div>
                        <button className={"btn"} disabled={!enabled} >Sign In</button>
                        {/*<div className={"log-in"}>*/}
                        {/*    <span className={'login-text'}>Forgot your password?</span><Link*/}
                        {/*    className={"link-login"} to={"/resetPassword"}>Reset Password</Link>*/}
                        {/*</div>*/}
                        <div className={"log-in"}>
                            <span className={'login-text'}>Don't have an account yet?</span><Link
                            className={"link-login"} to={"/signUp"}>Sign Up</Link>
                        </div>
                    </form>
                </Banner>
            </ImageContainer>

        </>

    )
}