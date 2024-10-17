import React, {useEffect} from 'react';
import {useLoginMutation} from "../../app/services/authService.js";
import {useDispatch} from "react-redux";
import {toast} from "react-toastify";
import {setCredentials, unsetAuthPopup} from "./authSlice.js";
import {useFormik} from "formik";
import {loginSchema} from "./schemas/schemaLogin.js";
import {Banner, Desc, Title} from "../../Styles/Banner.js";
import {ErrorMessageAuth, Field, Form, Input, Label} from "../../Styles/Auth.styled.js";
import {Button} from "../../Styles/Button.js";
import {Link} from "react-router-dom";

const SignIn = ({setShowSignIn,setShowSignUp}) => {
    const [login, { isSuccess, isError, data }] = useLoginMutation();
    const dispatch = useDispatch();
    useEffect(() => {
        if (data && isSuccess) {
            toast.success("Login Successful");
            dispatch(setCredentials({ ...data }));
            dispatch(unsetAuthPopup());
        }
        if (isError) {
            toast.error("Incorrect username or password");
        }
    }, [isSuccess, isError, data]);

    const onSubmit = () => {
        login({ username: values.usernameLogin, password: values.passwordLogin });
    };

    const { values, handleBlur, errors, touched, handleChange, handleSubmit } =
        useFormik({
            initialValues: {
                usernameLogin: "",
                passwordLogin: "",
            },
            validationSchema: loginSchema,
            onSubmit,
        });

    const openSignUp = () => {
        setShowSignUp(true);
        setShowSignIn(false)
    };
    return (
        <>
            <Banner className={"auth_section"}>
                <Title>Sign Into Your Account</Title>
                <Desc>Travel Moldova</Desc>
                <Form onSubmit={handleSubmit} autoComplete={"off"}>
                    <Field>
                        <Label>
                            <label>Username </label>
                        </Label>
                        <Input
                            id="usernameLogin"
                            onChange={handleChange}
                            value={values.usernameLogin}
                            onBlur={handleBlur}
                            $isError={errors.usernameLogin && touched.usernameLogin}
                            type={"text"}
                            placeholder={"Choose a username"}
                        />
                        {errors.usernameLogin && touched.usernameLogin && (
                            <ErrorMessageAuth>{errors.usernameLogin}</ErrorMessageAuth>
                        )}
                    </Field>

                    <Field>
                        <Label>
                            <label>Password </label>
                        </Label>
                        <Input
                            id="passwordLogin"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.passwordLogin}
                            $isError={errors.passwordLogin && touched.passwordLogin}
                            type={"password"}
                            placeholder={"Choose a password"}
                        />
                        {errors.passwordLogin && touched.passwordLogin && (
                            <ErrorMessageAuth>{errors.passwordLogin}</ErrorMessageAuth>
                        )}
                    </Field>
                    <Button type={"submit"}>Sign In</Button>
                    <div className={"log-in"}>
                        <span className={"login-text"}>Forgot your password?</span>
                        <Link className={"link-login"} to={"/signIn/sendEmail"}>
                            Reset Password
                        </Link>
                    </div>
                    <div className={"log-in"}>
                  <span className={"login-text"}>
                    Don't have an account yet?
                  </span>
                        <div onClick={openSignUp} className={"link-login"}>
                            Sign Up
                        </div>
                    </div>
                </Form>
            </Banner>
        </>
    );
};

export default SignIn;
