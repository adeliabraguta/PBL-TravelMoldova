import {useSelector} from "react-redux";
import {selectCurrentToken} from "../../features/authentification/authSlice.js";
import {Navigate, Outlet, useLocation} from "react-router-dom";

export default function RequireAuth() {
    const token = useSelector(selectCurrentToken)
    const location = useLocation()
    return (
        token ? <Outlet/> : <Navigate to={"/SignIn"} state={{from: location}} replace/>
    )
}