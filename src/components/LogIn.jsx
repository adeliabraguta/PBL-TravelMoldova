import styled from "styled-components";
import {Link} from "react-router-dom";
import {Banner, Desc, Home, Line, Title} from "../Styles/Banner.js";
import {useEffect} from "react";
import {ImageContainer} from "./SignUp.jsx";

export default function LogIn() {

    return (
        <>
            <ImageContainer>
                <Banner className={"banner"}>
                    <Title>
                        Log Into Your Account
                    </Title>
                    <Desc>
                        Travel Moldova
                    </Desc>
                    <form className={"form"}>
                        <div className={"form_section"}>
                            <label className={"label"}>Username</label>
                            <input className={"input"} type={"text"} placeholder={"Choose a username"}/>
                        </div>

                        <div className={"form_section"}>
                            <label className={"label"}>Password</label>
                            <input className={"input"} type={"password"} placeholder={"Choose a password"}/>
                        </div>

                        <button className={"btn"}>Log In</button>
                        <div className={"log-in"}>
                            <span className={'login-text'}>Don't have an account yet?</span><Link className={"link-login"} to={"/signUp"}>Sign Up</Link>
                        </div>
                    </form>
                </Banner>
            </ImageContainer>

        </>

    )
}