import { Banner, Desc, Title } from "../../Styles/Banner.js";
import React, { useEffect } from "react";
import {
  AuthContainer,
  ErrorMessageAuth,
  Field,
  Form,
  Input,
  Label,
} from "../../Styles/Auth.styled.js";
import { Button } from "../../Styles/Button.js";
import { usePutResetPasswordMutation } from "../../app/services/apiService.js";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { resetPasswordSchema } from "./schemas/resetPasswordSchema.js";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../app/services/authService.js";
import { useDispatch } from "react-redux";
import { setCredentials, unsetAuthPopup } from "./authSlice.js";
import { loginSchema } from "./schemas/schemaLogin.js";

export default function ResetPassword({
  setShowSignIn,
  setShowSignUp,
  setShowResetPassword,
}) {
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
    setShowSignIn(false);
  };

  const openResetPassword = () => {
    setShowResetPassword(true);
    setShowSignIn(false);
  };
  return (
    <>
      <Banner className={"auth_section"}>
        <Title>Reset Password</Title>
        <Desc>Travel Moldova</Desc>
        <Form onSubmit={handleSubmit} autoComplete={"off"}>
          <Field>
            <Label>
              <label>Current Password</label>
            </Label>
            <Input
              id="usernameLogin"
              onChange={handleChange}
              value={values.usernameLogin}
              onBlur={handleBlur}
              $isError={errors.usernameLogin && touched.usernameLogin}
              type={"password"}
              placeholder={"Choose a username"}
            />
            {/*{errors.usernameLogin && touched.usernameLogin && (*/}
            {/*    <ErrorMessageAuth>{errors.usernameLogin}</ErrorMessageAuth>*/}
            {/*)}*/}
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

          <Field>
            <Label>
              <label>Repeat Password</label>
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
          <Button type={"submit"}>Save</Button>
          {/*<div className={"log-in"}>*/}
          {/*  <span className={"login-text"}>Forgot your password?</span>*/}
          {/*  <div onClick={openResetPassword} className={"link-login"}>*/}
          {/*    Reset Password*/}
          {/*  </div>*/}
          {/*</div>*/}
          <div className={"log-in"}>
            <span className={"login-text"}>Don't have an account yet?</span>
            <div onClick={openSignUp} className={"link-login"}>
              Sign Up
            </div>
          </div>
        </Form>
      </Banner>
    </>
  );
}
