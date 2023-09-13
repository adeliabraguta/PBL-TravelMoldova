import {Link, NavLink} from "react-router-dom";
import styled from "styled-components";
import {IoPersonAddOutline} from "react-icons/io5";

export default function NavBar() {
    const navLinkStyle = ({isActive}) => {
        return {
            color: isActive ? 'var(--color-blue-3)' : 'var(--color-grey-0)',
            transition: '0.3s ease'
        }
    }

    return (
        <Nav >
            <div className={"nav_bar"}>
                <Link to={'/'} className={"left_side"}>
                    <img className={"img"} src="../../assets/moldova4.png"/>
                    <h1 className={"title"}>TRAVEL MOLDOVA</h1>
                </Link>

                <div className={"right_side"}>
                    <div className={"links"}>
                        <NavLink  to={'/destinations'} className={`link title`}>DESTINATIONS</NavLink>
                        {/*<NavLink className={`${style.link} ${style.title}`}>STORIES</NavLink>*/}
                    </div>
                    <div className={"sign-up"}>
                        <IoPersonAddOutline className={"icon"}/>
                        <NavLink to={"/signUp"} className={"link-signup"}>Sign Up</NavLink>
                    </div>
                </div>
            </div>
        </Nav>

    )
}
const Nav =styled.div`
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

      .right_side{
        display: flex;
        gap: 128px;
        //color: var(--color-grey-0);
        .links{
          display: flex;
          gap: 64px;
          align-items: center;
          .link{
            text-decoration: none;
            transition: 0.3s ease;
            color: var(--color-grey-0);
            &:hover
            {
              color: var(--color-blue-1);!important;
            }
          }
          .title{
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
          transition: 0.3s ease;
          .link-signup {
            text-decoration: none;
            font-size: 20px;
            color: inherit;
          }
          .icon {
            width: 24px;
            height: 24px;
            cursor: pointer;
            color: inherit;
            
          }
          &:hover,
          &:active {
            color: var(--color-blue-0);
          }
        }
      }
    }

  
`
