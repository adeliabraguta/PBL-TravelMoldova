import {ImageContainer} from "./SignUp.jsx";
import {Banner, Desc, Title} from "../../Styles/Banner.js";
import {Link, useNavigate} from "react-router-dom";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {useReVerificationEmailMutation, useVerificationEmailMutation} from "../../app/services/apiService.js";
import {setCredentials} from "./authSlice.js";
import {useDispatch} from "react-redux";

export default function VerificationEmail() {
    const [verification, { isSuccess: isSuccess, isError: isError, error: error, data: data}] = useVerificationEmailMutation()
    const [reVerification, {isSuccess: isSuccessEmail, isError: isErrorEmail, error: errorEmail, data: dataEmail}] = useReVerificationEmailMutation()
    const [code, setCode] = useState('')
    const [email, setEmail] = useState('')
    const parser = new DOMParser();
    const document= parser.parseFromString(error?.data, 'text/html')
    const errorMessage = document.querySelector('p')?.textContent
    const document1= parser.parseFromString(errorEmail?.data, 'text/html')
    const errorMessageEmail = document1.querySelector('p')?.textContent
    const [message, setMessage]= useState('')
    const enabled =
         true
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const Ref = useRef(null);
    const [timer, setTimer] = useState('00:00:00');

    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);

        return {
            total, minutes, seconds
        };
    }

    const startTimer = (e) => {
        let {total, minutes, seconds}
            = getTimeRemaining(e);
        if (total >= 0) {
            setTimer(
                (minutes > 9 ? minutes : '0' + minutes) + ':'
                + (seconds > 9 ? seconds : '0' + seconds)
            )
        }
    }

    const clearTimer = (e) => {
        setTimer('01:00');
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000)
        Ref.current = id;
    }
    const getDeadTime = () => {
        let deadline = new Date();
        deadline.setSeconds(deadline.getSeconds() + 60);
        return deadline;
    }
    useEffect(() => {
        clearTimer(getDeadTime());
    }, []);
    const onClickReset = (e) => {
        e.preventDefault()
        clearTimer(getDeadTime());
    }
    useEffect(() => {
            if(isSuccess) {
                navigate("/")
            }
        },
        [isSuccess]
    )
    useEffect(()=>{
        if(isError){
            setMessage("Incorrect Code")
            console.log(message)
        }
        if (isErrorEmail){
            setMessage(errorMessageEmail)
            console.log(message)

        }
        if(isSuccessEmail) {
            setMessage("Code resented")
            console.log(message)
        }
    },[isError,isErrorEmail])
    const handleSubmitCode = useCallback((e) => {
        e.preventDefault()
        verification( code);
        clearTimer(getDeadTime());
        clearInterval(Ref.current)
        setTimer("00:00")
        setCode('')
    }, [code]);
    const handleSubmitEmail = useCallback((e) => {
        e.preventDefault()
        reVerification( email);
        clearInterval(Ref.current)
        setTimer("01:00")
        setEmail('')
    }, [email]);
    return (
        <>
            <ImageContainer>
                <Banner className={"banner"}>
                    <Title>
                        Email Verification
                    </Title>
                    <Desc>
                        Travel Moldova
                    </Desc>
                    <div className={"not-confirmed"}>
                        {message}
                    </div>

                    <form className={"form"} onSubmit={handleSubmitCode}>
                        <span>{timer}</span>
                        <div className={`${timer === "00:00" ? "expired" : ""}`}>
                            <div className={`form_section`}>
                                <div className={"label-div"}>
                                    <label className={"label"}>We sent you the verification code on your Email </label>
                                </div>
                                <input value={code} onChange={e => setCode(e.target.value)} className={"input"}
                                       type={"text"} placeholder={"Enter your verification code here..."}/>
                            <button style={{marginTop: "16px"}} className={"btn"} disabled={!enabled}>Verify</button>
                            </div>
                        </div>
                    </form>
                    <form className={"form"} onSubmit={handleSubmitEmail}>
                            <div className={`${timer > "00:30"  ? "disable" : ""}`}>
                                <div className={"form_section"} style={{paddingTop: "24px"}}>
                                    <div className={"label-div"}>
                                        <label className={"label"}>Something went wrong?</label>
                                    </div>
                                    <input value={email} onChange={e => setEmail(e.target.value)} className={"input"}
                                           type={"email"} placeholder={"Enter your email again..."}/>
                                <button style={{marginTop: "16px"}} className={"btn"} disabled={!enabled}>Send Email Again</button>
                                </div>
                            </div>
                        </form>
                </Banner>
            </ImageContainer>

        </>
    )
}