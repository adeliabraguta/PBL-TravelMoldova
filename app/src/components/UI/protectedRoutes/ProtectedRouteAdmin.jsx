import React from "react";
import { useSelector } from "react-redux";
import PostDestination from "../../../features/postDestination/PostDestination.jsx";
import NoMatch from "../NoMatch.jsx";

const ProtectedRouteAdmin = () => {
  const userRole = useSelector((state) => state.auth.user.role);
  return userRole === "admin" ? <PostDestination /> : <NoMatch />;
};

export default ProtectedRouteAdmin;
