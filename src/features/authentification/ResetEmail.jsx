import { Banner, Desc, Title } from "../../Styles/Banner.js";
import * as yup from "yup";
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
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice.js";
import { useGetResetEmailQuery } from "../../app/services/apiService.js";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { skipToken } from "@reduxjs/toolkit/query/react";
import {useNavigate} from "react-router-dom";

export default function ResetEmail() {
  const navigate = useNavigate()
  const [myState, setMyState] = React.useState(skipToken);

  const { data, isError, isSuccess } = useGetResetEmailQuery(myState);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Message code sent to email");
      navigate('/signIn/sendEmail/resetPassword')
    } else if (isError) {
      toast.error("Something went wrong");
    }
  }, [isSuccess, isError]);
  const onSubmit = async (values) => {
    try {
      setMyState(values.email);
    } catch (error) {
      console.error("Error occurred:", error);
      toast.error("Failed to reset password");
    }
  };

  const resetEmailSchema = yup.object().shape({
    email: yup.string().required("Email is required"),
  });

  const { handleBlur, values, errors, touched, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
      },
      validationSchema: resetEmailSchema,
      onSubmit,
    });

  return (
    <>
      <AuthContainer>
        <Banner className={"auth_section"}>
          <Desc>Your Profile</Desc>
          <Title>Reset Password</Title>
          <Form autoComplete={"off"} onSubmit={handleSubmit}>
            <Field>
              <Label>
                <label>Username or Email</label>
              </Label>
              <Input
                name={"email"}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                $isError={errors.email && touched.email}
                type={"text"}
                placeholder={"Enter username or email"}
              />
              {errors.email && touched.email && (
                <ErrorMessageAuth>{errors.email}</ErrorMessageAuth>
              )}
            </Field>
            <Button type={"submit"}>Reset Password</Button>
          </Form>
        </Banner>
      </AuthContainer>
    </>
  );
}
