import { Link, useNavigate } from "react-router-dom";
import { Banner, Desc, Title } from "../../Styles/Banner.js";
import React, { useEffect } from "react";
import { useLoginUserMutation } from "../../app/services/apiService.js";
import { setCredentials, setUserName } from "./authSlice.js";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { loginSchema } from "./schemas/schemaLogin.js";
import { toast } from "react-toastify";
import {
  AuthContainer,
  ErrorMessageAuth,
  Field,
  Form,
  Input,
  Label,
} from "../../Styles/Auth.styled.js";
import {Button} from "../../Styles/Button.js";

export default function SignIn() {
  const navigate = useNavigate();
  const [login, { isSuccess, isError, data }] = useLoginUserMutation();
  const dispatch = useDispatch();
  useEffect(() => {
    if (data && isSuccess) {
      toast.success("Login Successful");
      dispatch(
        setCredentials({ ...data, usernameLogin: values.passwordLogin }),
      );
      dispatch(setUserName({ username: values.usernameLogin }));
      navigate("/");
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
  return (
    <>
      <AuthContainer>
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
            <Button type={"submit"}>
              Sign In
            </Button>
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
          </Form>
        </Banner>
      </AuthContainer>
    </>
  );
}
