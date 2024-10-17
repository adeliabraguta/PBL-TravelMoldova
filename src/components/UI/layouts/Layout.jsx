import React from 'react';
import NavBar from "../NavBar.jsx";
import FooterComponent from "../FooterComponent.jsx";
import {Outlet} from "react-router-dom";

const Layout = () => {
    return (
        <>
            <NavBar />
            <Outlet/>
            <FooterComponent />
        </>
    );
};

export default Layout;
