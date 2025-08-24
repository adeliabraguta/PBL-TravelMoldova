import React from "react";
import { useSelector } from "react-redux";
import DestinationPageAccount from "../../DestinationPageAccount.jsx";
import DestinationPageNoAccount from "../../DestinationPageNoAccount.jsx";

const ProtectedRouteDestination = () => {
  const authStatus = useSelector((state) => state.auth.user.isAuthenticated);
  return authStatus ? <DestinationPageAccount /> : <DestinationPageNoAccount />;
};

export default ProtectedRouteDestination;
