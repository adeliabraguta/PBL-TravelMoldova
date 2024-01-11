import {Link, useNavigate} from "react-router-dom";
import {Banner, Desc, Title} from "../../Styles/Banner.js";
import React, {useEffect} from "react";
import {useLoginUserMutation} from "../../app/services/apiService.js";
import {setCredentials, setUserName} from "./authSlice.js";
import {useDispatch} from "react-redux";
import {useFormik} from "formik";
import {loginSchema} from "./schemas/schemaLogin.js";
import {toast} from "react-toastify";
import {ImageContainer} from "../../Styles/Auth.styled.js";

export default function SignIn() {
    const navigate = useNavigate();
    const [login, {isSuccess, isError, data}] = useLoginUserMutation();
    const dispatch = useDispatch();
    useEffect(() => {
        if (data && isSuccess) {
            toast.success("Login Successful");
            dispatch(
                setCredentials({...data, usernameLogin: values.passwordLogin}),
            );
            dispatch(setUserName({username: values.usernameLogin}));
            navigate("/");
        }
        if (isError) {
            toast.error("Incorrect username or password");
        }
    }, [isSuccess, isError, data]);
    const onSubmit = () => {
        login({username: values.usernameLogin, password: values.passwordLogin});
    };

    const {values, handleBlur, errors, touched, handleChange, handleSubmit} =
        useFormik({
            initialValues: {
                usernameLogin: "",
                passwordLogin: "",
            },
            validationSchema: loginSchema,
            onSubmit,
        });
    return (
        <>
            <ImageContainer>
                <Banner className={"banner"}>
                    <Title>Sign Into Your Account</Title>
                    <Desc>Travel Moldova</Desc>
                    <div className={"not-confirmed"}></div>
                    <form className={"form"} onSubmit={handleSubmit} autoComplete={"off"}>
                        <div className={"form_section"}>
                            <div className={"label-div"}>
                                <label className={"label"}>Username </label>
                            </div>
                            <input
                                id="usernameLogin"
                                onChange={handleChange}
                                value={values.usernameLogin}
                                onBlur={handleBlur}
                                className={
                                    errors.usernameLogin && touched.usernameLogin
                                        ? "input-error"
                                        : "input"
                                }
                                type={"text"}
                                placeholder={"Choose a username"}
                            />
                            {errors.usernameLogin && touched.usernameLogin && (
                                <div className={"not-confirmed"}>{errors.usernameLogin}</div>
                            )}
                        </div>

                        <div className={"form_section"}>
                            <div className={"label-div"}>
                                <label className={"label"}>Password </label>
                            </div>
                            <input
                                id="passwordLogin"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.passwordLogin}
                                className={
                                    errors.passwordLogin && touched.passwordLogin
                                        ? "input-error"
                                        : "input"
                                }
                                type={"password"}
                                placeholder={"Choose a password"}
                            />
                            {errors.passwordLogin && touched.passwordLogin && (
                                <div className={"not-confirmed"}>{errors.passwordLogin}</div>
                            )}
                        </div>
                        <button className={"btn"} type={"submit"}>
                            Sign In
                        </button>
                        {/*<div className={"log-in"}>*/}
                        {/*    <span className={'login-text'}>Forgot your password?</span><Link*/}
                        {/*    className={"link-login"} to={"/resetPassword"}>Reset Password</Link>*/}
                        {/*</div>*/}
                        <div className={"log-in"}>
                            <span className={"login-text"}>Don't have an account yet?</span>
                            <Link className={"link-login"} to={"/signUp"}>
                                Sign Up
                            </Link>
                        </div>
                    </form>
                </Banner>
            </ImageContainer>
        </>
    );
}
