import * as yup from "yup"
export const resetPasswordSchema = yup.object().shape({
    token: yup.string().required("Code is required"),
    rpassword: yup.string().min(7).required("Password is required"),
    rconfirmPassword: yup.string().oneOf([yup.ref('rpassword'),null], 'Passwords must match').required("Confirm" +
        "password is required")
})