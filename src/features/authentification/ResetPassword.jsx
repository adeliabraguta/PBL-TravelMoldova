import {Banner, Desc, Title} from "../../Styles/Banner.js";
import {Link} from "react-router-dom";
import React, {useState} from "react";
import {ImageContainer} from "../../Styles/Auth.styled.js";

export default function ResetPassword(){
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isPasswordTouched, setIsPasswordTouched] = useState(false);
    const getEnabledStatus = (inputValue) => inputValue.length > 0;
    const enabledPassword = getEnabledStatus(password);
    const enabledConfirmPassword = getEnabledStatus(confirmPassword);
    const enabled =
        password.length > 7 && confirmPassword.length > 7
    const handlePasswordInput = (e) => setPassword(e.target.value)
    const handleConfirmPasswordInput = (e) => {
        setConfirmPassword(e.target.value)
    }
    const handleMessage = () => {
        setIsPasswordTouched(true);
    }
    return(
        <>
            <ImageContainer>
                <Banner className={"banner"}>
                    <Title>
                        Reset Password
                    </Title>
                    <Desc>
                        Travel Moldova
                    </Desc>
                    <div className={"not-confirmed"}>
                        {/*{isError && errorMessage }*/}
                    </div>
                    <form className={"form"}  >
                        <div className={"form_section"}>
                            <div className={'label-div'}>

                                <label className={"label"}>New Password</label>
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
                        <button className={"btn"} disabled={!enabled} >Sign In</button>
                        <div className={"log-in"}>
                            <span className={'login-text'}>Don't have an account yet?</span><Link
                            className={"link-login"} to={"/signUp"}>Sign Up</Link>
                        </div>
                        <div className={"log-in"}>
                            <span className={'login-text'}>Forgot your password?</span><Link
                            className={"link-login"} to={"/resetPassword"}>Reset Password</Link>
                        </div>
                    </form>
                </Banner>
            </ImageContainer>

        </>
    )
}