import React from "react";
import {useSelector} from "react-redux";
import {Navigate, Outlet} from "react-router-dom";

const ProtectedRouteUser = () => {
  const authStatus = useSelector((state) => state.auth.user.isAuthenticated);

  return authStatus ? <Outlet/> : <Navigate replace to="/" />;
}

export default ProtectedRouteUser;
