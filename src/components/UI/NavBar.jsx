import {Link, NavLink} from "react-router-dom";
import styled from "styled-components";
import {IoLogInOutline, IoPersonAddOutline, IoPersonOutline} from "react-icons/io5";
import {selectCurrentToken, selectCurrentUser, setCredentials} from "../../features/authentification/authSlice.js";
import {useDispatch, useSelector} from "react-redux";


export default function NavBar() {
    const token = useSelector(selectCurrentToken)
    const user = useSelector(selectCurrentUser)
    // const userName= user.charAt(0).toUpperCase() + user.slice(1)
    console.log(user)
    const navLinkStyle = ({isActive}) => {
        return {
            color: isActive ? 'var(--color-blue-3)' : 'var(--color-grey-0)',
            transition: '0.3s ease'
        }
    }

    return (
        <Nav>
            <div className={"nav_bar"}>
                <Link to={'/'} className={"left_side"}>
                    <img className={"img"} src="../../../assets/moldova4.png"/>
                    <h1 className={"title"}>TRAVEL MOLDOVA</h1>
                </Link>

                <div className={"right_side"}>
                    <div className={"links"}>
                        <NavLink to={'/destinations'} className={`link title`}>DISCOVER</NavLink>
                        {/*<NavLink className={`${style.link} ${style.title}`}>STORIES</NavLink>*/}
                    </div>
                    {token ? <div className={"sign-up"}>
                            <IoPersonOutline className={"icon"}/>
                            <NavLink to={"/userAccount"} className={"link-signup"}>{user}</NavLink>
                        </div> :
                        <div className={"sign-up"}>
                            {/*<IoLogInOutline className={"icon"}/>*/}
                            <NavLink to={"/signIn"} className={"link-signin"}>Sign In</NavLink> |
                            <NavLink to={"/signUp"} className={"link-signup"}>Sign Up</NavLink>
                        </div>
                    }
                </div>
            </div>
        </Nav>

    )
}
const Nav = styled.div`
  height: 96px;
  width: 100%;
  position: fixed;
  z-index: 1;
  background-color: white;
  opacity: 90%;
  //border-bottom: solid white;
  .nav_bar {
    //border-bottom: solid #102A43;
    margin: 0 48px;
    height: 96px;
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
        //transform: scale(1.01);
        color: var(--color-blue-1);

      }

      .img {
        height: 36px;
        width: 36px;
      }

      .title {
        font-size: 20px;
        font-weight: 600;
        letter-spacing: 1.1px;
      }
    }

    .right_side {
      display: flex;
      gap: 96px;
      //color: var(--color-grey-0);
      .links {
        display: flex;
        gap: 64px;
        align-items: center;

        .link {
          text-decoration: none;
          transition: 0.3s ease;
          color: var(--color-grey-0);

          &:hover {
            color: var(--color-blue-1);
          !important;
          }
        }

        .title {
          letter-spacing: 1.1px;
          font-size: 20px;
          font-weight: 600;
        }
      }

      .sign-up {
        gap: 8px;
        display: flex;
        align-items: center;
        color: var(--color-blue-5);
        justify-content: center;

        .link-signin {
          text-decoration: none;
          font-size: 20px;
          color: inherit;
          transition: 0.3s ease;
          
          &:hover,
          &:active {
            color: var(--color-blue-0);
          }
        }
        .link-signup {
          text-decoration: none;
          font-size: 20px;
          color: var(--color-green-5);
          transition: 0.3s ease;
          font-weight: 600;
          
          &:hover,
          &:active {
            color: var(--color-green-1);
          }
        }

        .icon {
          width: 24px;
          height: 24px;
          cursor: pointer;
          color: inherit;

        }

 
      }
    }
  }


`
