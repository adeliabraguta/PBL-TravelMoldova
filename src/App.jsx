import "./App.css";
import HomePage from "./components/HomePage.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import DestinationsPage from "./components/DestinationsPage.jsx";
import NoMatch from "./components/UI/NoMatch.jsx";
import SignUp from "./features/authentification/SignUp.jsx";
import SignIn from "./features/authentification/SignIn.jsx";
import StoryPage from "./components/StoryPage";
import { TransitionGroup } from "react-transition-group";
import PostDestination from "./features/postDestination/PostDestination.jsx";
import ProfileNavigation from "./components/profile/profileNavigation.jsx";
import ProfileFav from "./components/profile/profileFav.jsx";
import ProfileActivity from "./components/profile/ProfileActivity.jsx";
import Layout from "./components/UI/layouts/Layout.jsx";
import AuthLayout from "./components/UI/layouts/AuthLayout.jsx";
import ProtectedRouteUser from "./components/UI/protectedRoutes/ProtectedRouteUser.jsx";
import ProtectedRouteDestination from "./components/UI/protectedRoutes/ProtectedRouteDestination.jsx";

function App() {
  return (
    <div className="App">
      <TransitionGroup>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path={"/signUp"} element={<SignUp />} />
            <Route path={"/signIn"} element={<SignIn />} />
          </Route>
          <Route element={<Layout />}>
            <Route path={"/"} element={<HomePage />} />
            <Route path={"/posts"} element={<DestinationsPage />} />
            <Route path={"/story/:id/:slug"} element={<StoryPage />} />
            <Route element={<ProtectedRouteUser />}>
              <Route path="/profileNavigation" element={<ProfileNavigation />}>
                <Route
                  index
                  element={<Navigate to="/profileNavigation/profileFav" />}
                />
                <Route path="postDestination" element={<PostDestination />} />
                <Route path="profileActivity" element={<ProfileActivity />} />
                <Route path="profileFav" element={<ProfileFav />} />
              </Route>
            </Route>

            <Route
              path={"/posts/:slug"}
              element={<ProtectedRouteDestination />}
            />

            <Route path={"*"} element={<NoMatch />} />
          </Route>
        </Routes>
      </TransitionGroup>
    </div>
  );
}

export default App;
