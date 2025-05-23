import { useNavigate } from "react-router-dom";
import { Banner, Desc, Title } from "../../Styles/Banner.js";
import React, { useEffect } from "react";
import { useFormik } from "formik";
import { registerSchema } from "./schemas/schemaRegister.js";
import {
  ErrorMessageAuth,
  Field,
  Form,
  Input,
  Label,
} from "../../Styles/Auth.styled.js";
import { toast } from "react-toastify";
import { Button } from "../../Styles/Button.js";
import { useRegisterMutation } from "../../app/services/authService.js";

export default function SignUp({ setShowSignIn, setShowSignUp }) {
  const navigate = useNavigate();
  const [register, { isSuccess, isError }] = useRegisterMutation();
  const onSubmit = () => {
    register({
      username: values.username,
      password: values.password,
    });
  };

  const { values, handleBlur, errors, touched, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: registerSchema,
      onSubmit,
    });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Registration Successful");

      navigate("/signUp/verificationEmail");
    }
    if (isError) {
      toast.error("Username or email already exist");
    }
  }, [isSuccess]);

  const openSignIn = () => {
    setShowSignUp(false);
    setShowSignIn(true);
  };

  return (
    <>
      <Banner className={"auth_section"}>
        <Title>Create Your Account</Title>
        <Desc>Join Travel Moldova</Desc>
        <Form onSubmit={handleSubmit}>
          <Field>
            <Label>
              <label>Username </label>
            </Label>
            <Input
              id="username"
              onChange={handleChange}
              value={values.username}
              onBlur={handleBlur}
              $isError={errors.username && touched.username}
              type={"text"}
              placeholder={"Choose a username"}
            />
            {errors.username && touched.username && (
              <ErrorMessageAuth>{errors.username}</ErrorMessageAuth>
            )}
          </Field>
          <Field>
            <Label>
              <label>Email Address </label>
            </Label>
            <Input
              id="email"
              $isError={errors.email && touched.email}
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
              type={"email"}
              placeholder={"Enter your email"}
            />
            {errors.email && touched.email && (
              <ErrorMessageAuth>{errors.email}</ErrorMessageAuth>
            )}
          </Field>

          <Field>
            <Label>
              <label>Password </label>
            </Label>
            <Input
              id="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              $isError={errors.password && touched.password}
              type={"password"}
              placeholder={"Choose a password"}
            />
            {errors.password && touched.password && (
              <ErrorMessageAuth>{errors.password}</ErrorMessageAuth>
            )}
          </Field>
          <Field>
            <Label>
              <label>Confirm Password </label>
            </Label>
            <Input
              id="confirmPassword"
              $isError={errors.confirmPassword && touched.confirmPassword}
              type={"password"}
              value={values.confirmPassword}
              placeholder={"Repeat password"}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <ErrorMessageAuth>{errors.confirmPassword}</ErrorMessageAuth>
            )}
          </Field>
          <Button type={"submit"}>Create Account</Button>
          <div className={"log-in"}>
            <span className={"login-text"}>Already have an account?</span>
            <div className={"link-login"} onClick={openSignIn}>
              Sign In
            </div>
          </div>
        </Form>
      </Banner>
    </>
  );
}
