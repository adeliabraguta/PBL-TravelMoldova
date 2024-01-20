import {Banner, Desc, Title} from "../../Styles/Banner.js";
import React, {useEffect} from "react";
import {AuthContainer, ErrorMessageAuth, Field, Form, Input, Label} from "../../Styles/Auth.styled.js";
import {Button} from "../../Styles/Button.js";
import {usePutResetPasswordMutation} from "../../app/services/apiService.js";
import {toast} from "react-toastify";
import {useFormik} from "formik";
import {resetPasswordSchema} from "./schemas/resetPasswordSchema.js";
import {useNavigate} from "react-router-dom";

export default function ResetPassword(){

    const [reset, { isSuccess, isError, data }] = usePutResetPasswordMutation();
    const navigate = useNavigate()
    useEffect(() => {
        if (data && isSuccess) {
            toast.success("Password Updated Successful");
            navigate('/signIn')
        }
        if (isError) {
            toast.error("Password Updated Wrong");
        }
    }, [isSuccess, isError, data]);
    const onSubmit = () => {
        reset({
            password: values.rpassword,
            rpassword: values.rconfirmPassword,
            token: values.token,
        });
    };

    const { values, handleBlur, errors, touched, handleChange, handleSubmit } =
        useFormik({
            initialValues: {
                token: "",
                rpassword: "",
                rconfirmPassword: "",
            },
            validationSchema: resetPasswordSchema,
            onSubmit,
        });
    return(
        <>
            <AuthContainer>
                <Banner className={"auth_section"}>
                    <Desc>Your Profile</Desc>
                    <Title>Reset Password</Title>
                    <Form onSubmit={handleSubmit} autoComplete={"off"}>
                        <Field>
                            <Label>
                                <label>Code from email</label>
                            </Label>
                            <Input
                                name={"token"}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.token}
                                $isError={errors.token && touched.token}
                                type={"password"}
                                placeholder={"Enter verification code"}
                            />
                            {errors.token && touched.token && (
                                <ErrorMessageAuth>{errors.token}</ErrorMessageAuth>
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
            </AuthContainer>

        </>
    )
}