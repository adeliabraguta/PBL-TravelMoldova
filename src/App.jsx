import "./App.css";
import HomePage from "./components/HomePage.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import DestinationsPage from "./components/DestinationsPage.jsx";
import NoMatch from "./components/UI/NoMatch.jsx";
import StoryPage from "./components/StoryPage";
import { TransitionGroup } from "react-transition-group";
import ProfileNavigation from "./components/profile/profileNavigation.jsx";
import ProfileFav from "./components/profile/profileFav.jsx";
import ProfileActivity from "./components/profile/ProfileActivity.jsx";
import Layout from "./components/UI/layouts/Layout.jsx";
import ProtectedRouteUser from "./components/UI/protectedRoutes/ProtectedRouteUser.jsx";
import ProtectedRouteDestination from "./components/UI/protectedRoutes/ProtectedRouteDestination.jsx";
import ProtectedRouteAdmin from "./components/UI/protectedRoutes/ProtectedRouteAdmin.jsx";
import { useCheckAuthQuery } from "./app/services/authService.js";
import { useEffect } from "react";
import {
  setAuthStatus,
  setCredentials,
  unsetCredentials,
} from "./features/authentification/authSlice.js";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const { data } = useCheckAuthQuery();

  useEffect(() => {
    if (data) {
      if (!data.isAuthenticated) {
        dispatch(unsetCredentials());
      } else {
        dispatch(setCredentials({ ...data }));
      }
    }
  }, [data]);

  return (
    <div className="App">
      <TransitionGroup>
        <Routes>
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
                <Route
                  path="postDestination"
                  element={<ProtectedRouteAdmin />}
                />
                <Route path="profileActivity" element={<ProfileActivity />} />
                <Route path="profileFav" element={<ProfileFav />} />
              </Route>
            </Route>

            <Route
              path={"/posts/:id"}
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
