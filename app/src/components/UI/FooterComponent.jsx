import {IoLogoInstagram, IoLogoTwitter} from "react-icons/io";
import styled from "styled-components";

export default function FooterComponent() {
    return (
            <Footer>
                <div className={"desc"}>
                    <span className={"copy"}>&#169; Copyright 2023</span>
                    <span className={"name"}>| BY TRAVEL MOLDOVA</span>
                </div>
                <a className={"email"} href="mailto:adeliabraguta@gmail.com">travel.moldova@gmail.com</a>
                <div className={"icons"}>
                    <a href="#">
                        <IoLogoInstagram className={"icon"}></IoLogoInstagram>
                    </a>
                    <a href="#">
                        <IoLogoTwitter className={"icon"}></IoLogoTwitter>
                    </a>
                </div>
            </Footer>
    )
}
const Footer=styled.div`
    border-top: 2px solid var(--color-blue-9);
    margin: 0 48px;
    color: var(--color-grey-4);
    display: grid;
    grid-template-columns: 1fr;
    gap: 18px;
    align-items: center;
    padding: 48px;
    .desc {
      display: flex;
      gap: 18px;
      .copy {
        margin: 0;
      }
      .name {
        margin: 0;
        letter-spacing: 1.1px;
      }
    }
    .email {
      color: var(--color-grey-4);

      text-decoration: none;
      &:hover {
        color: var(--color-blue-0);
      }
    }
    .icons {
      display: flex;
      gap: 24px;
      align-items: center;
      text-decoration: none;

      .icon {
        color: var(--color-blue-3);

        height: 20px;
        width: 20px;

        &:hover {
          color: var(--color-blue-0);

        }
      }
    }
`