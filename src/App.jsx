import { useState } from "react";
import "./App.css";
import NavBar from "./components/UI/NavBar.jsx";
import HomePage from "./components/HomePage.jsx";
import FooterComponent from "./components/UI/FooterComponent.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import DestinationsPage from "./components/DestinationsPage.jsx";
import NoMatch from "./components/UI/NoMatch.jsx";
import DestinationPageNoAccount from "./components/DestinationPageNoAccount.jsx";
import DestinationPageAccount from "./components/DestinationPageAccount.jsx";
import SignUp from "./features/authentification/SignUp.jsx";
import SignIn from "./features/authentification/SignIn.jsx";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./features/authentification/authSlice.js";
import StoryPage from "./components/StoryPage";
import { TransitionGroup } from "react-transition-group";
import { useLocation } from "react-router-dom";
import VerificationEmail from "./features/authentification/VerificationEmail.jsx";
import PostDestination from "./features/postDestination/PostDestination.jsx";
import ResetPassword from "./features/authentification/ResetPassword.jsx";
import ProfileNavigation from "./components/profile/profileNavigation.jsx";
import ProfileFav from "./components/profile/profileFav.jsx";
import ProfileActivity from "./components/profile/ProfileActivity.jsx";
import ResetEmail from "./features/authentification/ResetEmail.jsx";

function App() {
  const token = useSelector(selectCurrentToken);
  const [showNav, setShowNav] = useState(true);
  const location = useLocation();

  const shouldShowNav =
    showNav &&
    location.pathname !== "/signUp" &&
    location.pathname !== "/signIn" &&
    location.pathname !== "/signUp/verificationEmail" &&
    location.pathname !== "/signIn/sendEmail" &&
    location.pathname !== "/signIn/sendEmail/resetPassword";

  return (
    <div className="App">
      {shouldShowNav && <NavBar />}
      <TransitionGroup>
        <Routes>
          <Route path={"/"} element={<HomePage />} />
          <Route path={"/posts"} element={<DestinationsPage />} />
          <Route path={"/story/:id/:slug"} element={<StoryPage />} />
          {token ? (
            <>
              <Route
                path={"/posts/:slug"}
                element={<DestinationPageAccount />}
              />
              <Route
                path={"/profileNavigation"}
                element={<ProfileNavigation />}
              >
                <Route
                  path={"/profileNavigation"}
                  element={<Navigate to={"/profileNavigation/profileFav"} />}
                />
                <Route
                  path={"/profileNavigation/postDestination"}
                  element={<PostDestination />}
                />
                <Route
                  path={"/profileNavigation/profileActivity"}
                  element={<ProfileActivity />}
                />
                <Route
                  path={"/profileNavigation/profileFav"}
                  element={<ProfileFav />}
                />
              </Route>
            </>
          ) : (
            <>
              <Route
                path={"/posts/:slug"}
                element={<DestinationPageNoAccount />}
              />
            </>
          )}
          <Route
            path={"/signUp/verificationEmail"}
            element={<VerificationEmail />}
          />
          <Route path={"/signUp"} element={<SignUp />} />
          <Route path={"/signIn"} element={<SignIn />}/>
          <Route path={"/signIn/sendEmail"} element={<ResetEmail />} />
          <Route
            path={"/signIn/sendEmail/resetPassword"}
            element={<ResetPassword />}
          />

          <Route path={"*"} element={<NoMatch />} />
        </Routes>
      </TransitionGroup>
      {shouldShowNav && <FooterComponent />}
    </div>
  );
}

export default App;
