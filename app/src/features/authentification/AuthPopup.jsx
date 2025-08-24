import React, { useEffect, useState } from "react";
import { unsetAuthPopup } from "./authSlice.js";
import { useDispatch } from "react-redux";
import { Auth, AuthContainer } from "../../Styles/Auth.styled.js";
import { IoCloseOutline } from "react-icons/io5";
import SignUp from "./SignUp.jsx";
import SignIn from "./SignIn.jsx";
import ResetPassword from "./ResetPassword.jsx";

export default function AuthPopup() {
  const dispatch = useDispatch();
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const closePopup = () => {
    dispatch(unsetAuthPopup());
    setShowSignIn(true);
    setShowSignUp(false);
    setShowResetPassword(false);
  };

  const [showSignUp, setShowSignUp] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [showSignIn, setShowSignIn] = useState(true);

  return (
    <>
      <AuthContainer>
        <Auth>
          <button onClick={closePopup} className={"close_btn"}>
            <IoCloseOutline />
          </button>
          {showSignIn && (
            <SignIn
              setShowSignIn={setShowSignIn}
              setShowSignUp={setShowSignUp}
              setShowResetPassword={setShowResetPassword}
            />
          )}

          {showSignUp && (
            <SignUp
              setShowSignIn={setShowSignIn}
              setShowSignUp={setShowSignUp}
            />
          )}

          {showResetPassword && (
            <ResetPassword
              setShowSignIn={setShowSignIn}
              setShowResetPassword={setShowResetPassword}
            />
          )}
        </Auth>
      </AuthContainer>
    </>
  );
}
