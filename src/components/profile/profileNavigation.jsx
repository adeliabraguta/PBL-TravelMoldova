import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Home, Line } from "../../Styles/Banner.js";
import { unsetCredentials } from "../../features/authentification/authSlice.js";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useLogoutMutation } from "../../app/services/authService.js";

function ProfileNavigation(props) {
  const dispatch = useDispatch();
  const userRole = useSelector((state) => state.auth.user.role);

  const [logout] = useLogoutMutation();
  const handleLogout = () => {
    dispatch(unsetCredentials());
    logout();
  };
  return (
    <Home>
      <Line>
        <ProfileNav>
          <NavLink className={"link"} to={"/profileNavigation/profileFav"}>
            <p>Favorite Destinations</p>
          </NavLink>
          <NavLink className={"link"} to={"/profileNavigation/profileActivity"}>
            <p>Your Activity</p>
          </NavLink>
          {userRole === "admin" && (
            <NavLink
              className={"link"}
              activeclassname="active"
              to={"/profileNavigation/postDestination"}
            >
              <p>Post a Destination</p>
            </NavLink>
          )}
          <NavLink to={"/"} className={"link"} onClick={handleLogout}>
            <p>Sign Out</p>
          </NavLink>
        </ProfileNav>
        <ProfileContainer>
          <Outlet />
        </ProfileContainer>
      </Line>
    </Home>
  );
}

export default ProfileNavigation;
export const activeStyle = {
  color: "var(--color-blue-1)", // Change this to the desired color
};
const ProfileNav = styled.div`
  position: fixed;
  background-color: white;
  display: flex;
  flex-direction: column;
  gap: 24px;
  border-left: 2px solid var(--color-grey-8);
  padding-left: 24px;

  p {
    margin: 0;
  }

  .link {
    text-decoration: none;
    transition: 0.3s ease;
    color: var(--color-grey-0);
    letter-spacing: 1.1px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;

    &:hover {
      color: var(--color-blue-1);
    }

    &:last-of-type {
      color: var(--color-blue-4);
    }

    &.active {
      ${activeStyle}
    }
  }
`;
const ProfileContainer = styled.div`
  margin-left: 250px;
  min-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 96px;
  flex-direction: column;
`;
