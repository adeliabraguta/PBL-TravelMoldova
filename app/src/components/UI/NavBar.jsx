import { Link, NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoOptions, IoPersonOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { setAuthPopup } from "../../features/authentification/authSlice.js";
import { BiLogInCircle } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import {
  selectIsFilterPopupVisible,
  setFilter,
  setFilterPopup,
  setSearch,
} from "../../features/searchDestination/searchSlice.js";
import FilterPopup from "../../features/searchDestination/filterPopup.jsx";

export default function NavBar() {
  const isAuthenticated = useSelector(
    (state) => state.auth.user.isAuthenticated,
  );

  const isPopupVisible = useSelector(selectIsFilterPopupVisible);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isFocused, setIsFocused] = useState(false);
  const [search, setSearchA] = useState("");
  const filerRef = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (!filerRef.current?.contains(event.target)) {
        dispatch(setFilterPopup(false));
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [isPopupVisible]);

  const toggleFilterPopup = () => {
    isPopupVisible
      ? dispatch(setFilterPopup(false))
      : dispatch(setFilterPopup(true));
  };
  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setSearch(search));
    setSearchA("");
    dispatch(setFilter({ type: "", rating: "" }));
    dispatch(setFilterPopup(false));
    navigate("/posts");
  };

  const handleClearFilters = () => {
    dispatch(setSearch(""));
    dispatch(setFilter({ type: "", rating: "" }));
  }

  return (
    <NavContainer>
      <NavigationBar>
        <Link to={"/"} className={"left_side"}>
          <img src="../../../assets/moldova4.png" alt={"Moldova Logo"} />
          <h1>TRAVEL MOLDOVA</h1>
        </Link>

        <div className={"right_side"}>
          <div className={"search_container"} ref={filerRef}>
            <div className={`search ${isFocused ? "focus" : ""}`}>
              <form onSubmit={(e) => handleSearch(e)}>
                <input
                  type={"search"}
                  value={search}
                  placeholder={"Search"}
                  onFocus={() => {
                    dispatch(setFilterPopup(false));
                    setIsFocused(true);
                  }}
                  onBlur={() => setIsFocused(false)}
                  onChange={(e) => setSearchA(e.target.value)}
                />
                <button type={"submit"}>
                  <FiSearch className={"icon"} />
                </button>
              </form>
              <button onClick={toggleFilterPopup}>
                <IoOptions
                  className={`icon ${isPopupVisible ? "focus" : ""}`}
                />
              </button>
            </div>
            <FilterPopup />
          </div>
          <div className={"menu"}>
            <NavLink to={"/posts"} className={"link"} onClick={handleClearFilters}>
              DISCOVER
            </NavLink>
          </div>
          {isAuthenticated ? (
            <div className={"menu menu_dropdown"}>
              <NavLink to={"profileNavigation"} className={"link "}>
                <IoPersonOutline className={"icon"} />
                Profile
              </NavLink>
            </div>
          ) : (
            <AuthContainer>
              <div
                onClick={() => dispatch(setAuthPopup())}
                className={"link_register"}
              >
                <BiLogInCircle className={"icon_logIn"} /> <span>Sign In</span>
              </div>
            </AuthContainer>
          )}
        </div>
      </NavigationBar>
    </NavContainer>
  );
}
const NavContainer = styled.div`
  padding: 8px 0;
  width: 100%;
  position: fixed;
  z-index: 1;
  background-color: rgba(255, 255, 255, 0.9);
`;
const NavigationBar = styled.div`
  margin: 0 96px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-content: center;
  padding: 0 24px;

  .left_side {
    margin: 0;
    color: var(--color-grey-0);
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 12px;
    transition: 0.3s ease;

    &:hover,
    &:active {
      color: var(--color-blue-1);
    }

    img {
      height: 36px;
      width: 36px;
    }

    h1 {
      font-size: 20px;
      font-weight: 600;
      letter-spacing: 1.1px;
    }
  }

  .right_side {
    display: flex;
    gap: 96px;

    .search_container {
      position: relative;
      display: flex;
      flex-direction: column;
      width: 300px;

      .search {
        padding: 6px 8px;
        display: flex;
        justify-content: center;
        border: 2px solid var(--color-grey-7);

        &.focus {
          border: 2px solid var(--color-blue-5);
        }

        input {
          font-size: 16px;
          border: none;
          background-color: rgba(255, 255, 255, 0);

          &:focus {
            outline: none;
          }
        }

        input[type="search"]::-webkit-search-decoration,
        input[type="search"]::-webkit-search-cancel-button,
        input[type="search"]::-webkit-search-results-button,
        input[type="search"]::-webkit-search-results-decoration {
          -webkit-appearance: none;
        }

        form button {
          border-right: 2px solid var(--color-grey-7);

          .icon {
            padding-right: 4px;
            color: var(--color-blue-5);
          }
        }

        button {
          border: none;
          background-color: transparent;

          .icon {
            width: 20px;
            height: 20px;
          }

          .icon {
            padding-left: 4px;
            color: var(--color-grey-4);
            transition: 0.3s ease;

            &:hover {
              color: var(--color-blue-3);
            }
          }

          .focus {
            color: var(--color-green-3);

            &:hover {
              color: var(--color-green-1);
            }
          }
        }
      }
    }

    //.search:focus-within {
    //    border: 2px solid var(--color-blue-5);
    //}

    .menu {
      display: flex;
      gap: 64px;
      align-items: center;

      p {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
      }

      .link {
        text-decoration: none;
        transition: 0.3s ease;
        color: var(--color-grey-0);
        letter-spacing: 1.1px;
        font-size: 20px;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        gap: 4px;

        &:hover {
          color: var(--color-blue-1);
        }
      }
    }

    .menu_dropdown {
      position: relative;
    }

    .dropdown-hide {
      display: none;
    }

    .dropdown {
      top: 80px;
      position: absolute;
      background-color: white;
      padding: 15px 15px;
      display: flex;
      width: max-content;
      flex-direction: column;
      align-items: start;
      gap: 12px;

      p {
        margin: 0;
      }
    }

    .icon {
      width: 24px;
      height: 24px;
      cursor: pointer;
      color: inherit;
    }
  }
`;
const AuthContainer = styled.div`
  gap: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-blue-5);

  .link_register {
    text-decoration: none;
    font-size: 20px;
    color: var(--color-green-5);
    transition: 0.3s ease;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;

    &:hover,
    &:active {
      color: var(--color-green-1);
    }

    .icon_logIn {
      width: 24px;
      height: 24px;
    }
  }
`;
