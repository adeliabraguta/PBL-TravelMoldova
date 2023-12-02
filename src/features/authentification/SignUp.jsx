import { Link, useNavigate } from "react-router-dom";
import { Banner, Desc, Title } from "../../Styles/Banner.js";
import React, { useEffect } from "react";
import { useRegisterUserMutation } from "../../app/services/apiService.js";
import { useFormik } from "formik";
import { registerSchema } from "./schemas/schemaRegister.js";
import {ImageContainer} from "../../Styles/Auth.styled.js";
import {toast} from "react-toastify";

export default function SignUp() {
  const navigate = useNavigate();
  const [register, { isSuccess, isError }] =
    useRegisterUserMutation();
  const onSubmit = () => {
    register({
      username: values.username,
      password: values.password,
      email: values.email,
    });
  };

  const { values, handleBlur,errors,touched, handleChange, handleSubmit } = useFormik({
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
    if(isError){
      toast.error("Username or email already exist");

    }
  }, [isSuccess]);
  return (
    <>
      <ImageContainer>
        <Banner className={"banner"}>
          <Title>Create Your Account</Title>
          <Desc>Join Travel Moldova</Desc>
          <div className={"not-confirmed"}></div>
          <form className={"form"} onSubmit={handleSubmit}>
            <div className={"form_section"}>
              <div className={"label-div"}>
                <label className={"label"}>Username </label>
              </div>
              <input
                id="username"
                onChange={handleChange}
                value={values.username}
                onBlur={handleBlur}
                className={errors.username && touched.username ? "input-error" : "input"}
                type={"text"}
                placeholder={"Choose a username"}
              />
              {errors.username && touched.username &&
              <div className={"not-confirmed"}>{errors.username}</div>}
            </div>
            <div className={"form_section"}>
              <div className={"label-div"}>
                <label className={"label"}>Email Address </label>
              </div>
              <input
                id="email"
                className={errors.email && touched.email ? "input-error" : "input"}
                value={values.email}
                onBlur={handleBlur}
                onChange={handleChange}
                type={"email"}
                placeholder={"Enter your email"}
              />
              {errors.email && touched.email &&
                  <div className={"not-confirmed"}>{errors.email}</div>}
            </div>

            <div className={"form_section"}>
              <div className={"label-div"}>
                <label className={"label"}>Password </label>
              </div>
              <input
                id="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                className={errors.password && touched.password ? "input-error" : "input"}
                type={"password"}
                placeholder={"Choose a password"}
              />
              {errors.password && touched.password &&
                  <div className={"not-confirmed"}>{errors.password}</div>}
            </div>
            <div className={"form_section"}>
              <div className={"label-div"}>
                <label className={"label"}>Confirm Password </label>
              </div>
              <input
                id="confirmPassword"
                className={errors.confirmPassword && touched.confirmPassword ? "input-error" : "input"}
                type={"password"}
                value={values.confirmPassword}
                placeholder={"Repeat password"}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.confirmPassword && touched.confirmPassword &&
                  <div className={"not-confirmed"}>{errors.confirmPassword}</div>}
            </div>
            <button type={"submit"} className={"btn"}>
              Create Account
            </button>
            <div className={"log-in"}>
              <span className={"login-text"}>Already have an account?</span>
              <Link className={"link-login"} to={"/signIn"}>
                Sign In
              </Link>
            </div>
          </form>
        </Banner>
      </ImageContainer>
    </>
  );
}

