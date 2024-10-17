import React from "react";
import { useSelector } from "react-redux";
import DestinationPageNoAccount from "../../DestinationPageAccount.jsx";
import DestinationPageAccount from "../../DestinationPageNoAccount.jsx";

const ProtectedRouteDestination = () => {
  const authStatus = useSelector((state) => state.auth.isAuthenticated);

  return authStatus ? <DestinationPageAccount /> : <DestinationPageNoAccount />;
};

export default ProtectedRouteDestination;
