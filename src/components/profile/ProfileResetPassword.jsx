import React, { useEffect } from "react";
import { useFormik } from "formik";
import { Banner, Desc, Title } from "../../Styles/Banner.js";
import { usePutResetPasswordMutation } from "../../app/services/apiService.js";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { selectCurrentToken } from "../../features/authentification/authSlice.js";
import { resetPasswordSchema } from "./resetPasswordSchema.js";
import {
  ErrorMessageAuth,
  Field,
  Form,
  Input,
  Label,
} from "../../Styles/Auth.styled.js";
import { Button } from "../../Styles/Button.js";

function ProfileResetPassword() {
  const token = useSelector(selectCurrentToken);

  const [reset, { isSuccess, isError, data }] = usePutResetPasswordMutation();
  useEffect(() => {
    if (data && isSuccess) {
      toast.success("Password Updated Successful");
    }
    if (isError) {
      toast.error("Password Updated Wrong");
    }
  }, [isSuccess, isError, data]);
  const onSubmit = () => {
    reset({
      password: values.password,
      rpassword: values.rpassword,
      token,
    });
  };

  const { values, handleBlur, errors, touched, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        password: "",
        rpassword: "",
        rconfirmPassword: "",
      },
      validationSchema: resetPasswordSchema,
      onSubmit,
    });
  return (
    <div>
      <Banner style={{ width: "100vh" }}>
        <Desc>Your Profile</Desc>
        <Title>Reset Password</Title>
        <Form onSubmit={handleSubmit} autoComplete={"off"}>
          <Field>
            <Label>
              <label>Old Password</label>
            </Label>
            <Input
              name={"password"}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              $isError={errors.password && touched.password}
              type={"password"}
              placeholder={"Enter old password"}
            />
            {errors.password && touched.password && (
              <ErrorMessageAuth>{errors.password}</ErrorMessageAuth>
            )}
          </Field>
          <Field>
            <Label>
              <label>New Password</label>
            </Label>
            <Input
              name={"rpassword"}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.rpassword}
              $isError={errors.rpassword && touched.rpassword}
              type={"password"}
              placeholder={"Choose a new password"}
            />
            {errors.rpassword && touched.rpassword && (
              <ErrorMessageAuth>{errors.rpassword}</ErrorMessageAuth>
            )}
          </Field>
          <Field>
            <Label>
              <label>Confirm Password</label>
            </Label>
            <Input
              name={"rconfirmPassword"}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.rconfirmPassword}
              $isError={errors.rconfirmPassword && touched.rconfirmPassword}
              type={"password"}
              placeholder={"Confirm new password"}
            />
            {errors.rconfirmPassword && touched.rconfirmPassword && (
              <ErrorMessageAuth>{errors.rconfirmPassword}</ErrorMessageAuth>
            )}
          </Field>
          <Button type={"submit"}>Reset Password</Button>
        </Form>
      </Banner>
    </div>
  );
}

export default ProfileResetPassword;
