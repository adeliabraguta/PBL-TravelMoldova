import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { Banner, Desc, Home, Line, Title } from "../../Styles/Banner.js";
import { useEffect, useState, useRef, useCallback } from "react";
import { ImageContainer } from "./SignUp.jsx";
import {useLoginUserMutation} from "../../app/services/apiService.js";
import { setCredentials } from "./authSlice.js";
import { useDispatch } from "react-redux";

export default function SignIn() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const [register, { isLoading, isSuccess, error, isError, data }] = useLoginUserMutation();
    
    const dispatch = useDispatch()

    useEffect(() => {
        if (isSuccess) {
            dispatch(setCredentials({ ...data, username}))
            navigate("/")
        }
    }, [isSuccess, data, username, navigate]);

    const handleSubmit = useCallback((e) => {
        e.preventDefault()
        register({ username, password });
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
                    <form className={"form"} onSubmit={handleSubmit}>
                        <div className={"form_section"}>
                            <label className={"label"}>Username</label>
                            <input value={username} onChange={handleUserInput}   className={"input"}
                                type={"text"} placeholder={"Choose a username"} />
                        </div>

                        <div className={"form_section"}>
                            <label className={"label"}>Password</label>
                            <input  className={"input"} value={password} onChange={handlePasswordInput}
                                type={"password"} placeholder={"Choose a password"} />
                        </div>

                        <button className={"btn"}>Sign In</button>
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