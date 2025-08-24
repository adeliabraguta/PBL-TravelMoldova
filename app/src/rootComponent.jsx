import React, { useState } from "react";
import AuthPopup from "./features/authentification/AuthPopup.jsx";
import App from "./App.jsx";
import { useSelector } from "react-redux";

const RootComponent = () => {
  const isAuthPopupVisible = useSelector(
    (state) => state.auth.isAuthPopupVisible,
  );

  return (
    <>
      {isAuthPopupVisible && <AuthPopup />}
      <App />
    </>
  );
};

export default RootComponent;
