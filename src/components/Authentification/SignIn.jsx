import styled from "styled-components";
import {Link, useNavigate} from "react-router-dom";
import {Banner, Desc, Home, Line, Title} from "../../Styles/Banner.js";
import {useEffect, useState} from "react";
import {ImageContainer} from "./SignUp.jsx";
import async from "async";
import {useLoginUserMutation} from "./ApiAuth.js";
import {setCredentials} from "./AuthSlice.js";
import {useDispatch} from "react-redux";
const dispatch = useDispatch();
export default function SignIn() {
    const [loginUser, {isLoading}] = useLoginUserMutation();

    async function HandleSubmit(e) {
        e.preventDefault()
        let item = {username, password}

        const result = await loginUser(item)
        if (result) {
            dispatch(setCredentials(result.data));
        }
        console.log(result)
    }

    // const [username, setUsername] = useState('')
    // const [password, setPassword] = useState('')
    // const navigate = useNavigate()
    // async function HandleSubmit(e) {
    //     e.preventDefault()
    //     let item = {username, password}
    //     console.log(item)
    //     let result = await fetch("http://127.0.0.1:5000/auth/login", {
    //         method: 'POST',
    //         body: JSON.stringify(item),
    //         headers: {
    //             "Content-Type": 'application/json',
    //             "Accept": 'application/json'
    //         },
    //     })
    //     result = await result.json()
    //     console.log(result)
    //     localStorage.setItem("user-info", JSON.stringify(result))
    //     navigate("/userAccount")
    // }
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
                    <form className={"form"} onSubmit={HandleSubmit}>
                        <div className={"form_section"}>
                            <label className={"label"}>Username</label>
                            <input onChange={e => setUsername(e.target.value)} value={username} className={"input"}
                                   type={"text"} placeholder={"Choose a username"}/>
                        </div>

                        <div className={"form_section"}>
                            <label className={"label"}>Password</label>
                            <input onChange={e => setPassword(e.target.value)} value={password} className={"input"}
                                   type={"password"} placeholder={"Choose a password"}/>
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