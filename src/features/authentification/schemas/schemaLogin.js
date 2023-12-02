import * as yup from "yup"
export const loginSchema = yup.object().shape({
    usernameLogin: yup.string().required("Username is required"),
    passwordLogin: yup.string().required("Password is required"),

})