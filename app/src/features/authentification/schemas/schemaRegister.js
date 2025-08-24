import * as yup from "yup"
export const registerSchema = yup.object().shape({
    username: yup.string().min(3).required("Username is required"),
    email: yup.string().email("Please enter a valid email").required("Email is required"),
    password: yup.string().min(7).required("Password is required"),
    confirmPassword: yup.string().oneOf([yup.ref('password'),null], 'Passwords must match').required("Confirm" +
        " password is required")
})