import styled from "styled-components";
import {Link, useNavigate} from "react-router-dom";
import {Banner, Desc, Home, Line, Title} from "../../Styles/Banner.js";
import {useEffect, useState, useRef} from "react";
import {ImageContainer} from "./SignUp.jsx";
import async from "async";
import {useLoginUserMutation} from "./ApiAuth.js";
import {setCredentials} from "./AuthSlice.js";
import {useDispatch} from "react-redux";

export default function SignIn() {
    const userRef = useRef();
    const errRef = useRef()
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [err, setErr] = useState()
    const navigate = useNavigate()

    const [login, {isLoading}] = useLoginUserMutation()
    const dispatch = useDispatch()
    useEffect(() => {
        userRef.current.focus()
    }, [])
    useEffect((username, password) => {
        setErr('')


    }, [username, password])


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const userData = await login({username, password}).unwrap()
            console.log(userData)
            dispatch(setCredentials({...userData, username}))
            setUsername('')
            setPassword('')
            navigate("/userAccount")
        } catch (err) {
            console.error('Login failed:', err);
            setErr('Login failed. Please check your credentials.');
            errRef.current.focus()
        }
    }
   const handleUserInput = (e) => setUsername(e.target.value)
    const handlePasswordInput = (e) => setPassword(e.target.value)


    // const [loginUser, {isLoading}] = useLoginUserMutation();
    //
    // async function HandleSubmit(e) {
    //     e.preventDefault()
    //     let item = {username, password}
    //
    //     const result = await loginUser(item)
    //     if (result) {
    //         dispatch(setCredentials(result.data));
    //     }
    //     console.log(result)
    // }

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
                    <form className={"form"} onSubmit={handleSubmit}>
                        <div className={"form_section"}>
                            <label className={"label"}>Username</label>
                            <input onChange={handleUserInput} value={username} className={"input"}
                                   type={"text"} placeholder={"Choose a username"}/>
                        </div>

                        <div className={"form_section"}>
                            <label className={"label"}>Password</label>
                            <input onChange={handlePasswordInput} value={password} className={"input"}
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