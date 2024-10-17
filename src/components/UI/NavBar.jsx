import {Link, NavLink} from "react-router-dom";
import styled from "styled-components";
import {IoPersonOutline} from "react-icons/io5";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import {setAuthPopup} from "../../features/authentification/authSlice.js";
import {BiLogInCircle} from "react-icons/bi";

export default function NavBar() {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const dispatch = useDispatch()
    const ref = useRef(null);
    const [showDropDown, setShowDropdown] = useState(false)

    useEffect(() => {
        const handle = (event) => {
            if (!ref.current?.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener("mousedown", handle);

        return () => {
            document.removeEventListener("mousedown", handle);
        };
    });

    return (
        <NavContainer>
            <NavigationBar>
                <Link to={"/"} className={"left_side"}>
                    <img src="../../../assets/moldova4.png" alt={"Moldova Logo"}/>
                    <h1>TRAVEL MOLDOVA</h1>
                </Link>

                <div className={"right_side"}>
                    <div className={"menu"}>
                        <NavLink to={"/posts"} className={"link"}>
                            DISCOVER
                        </NavLink>
                    </div>
                    {isAuthenticated ? (
                        <div
                            className={"menu menu_dropdown"}
                            ref={ref}
                            onClick={() => setShowDropdown(!showDropdown)}
                        >
                            <NavLink to={"profileNavigation"} className={"link "}>
                                <IoPersonOutline className={"icon"}/>
                                Profile
                            </NavLink>
                        </div>
                    ) : (
                        <AuthContainer>
                            <div onClick={() => dispatch(setAuthPopup())} className={"link_register"}>
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
    background-color: white;
    opacity: 90%;
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
        
        .icon_logIn{
            width: 24px;
            height: 24px;
        }
    }
`;
