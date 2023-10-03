import {useState} from 'react'
import './App.css'
import NavBar from "./components/UI/NavBar.jsx";
import HomePage from "./components/HomePage.jsx";
import FooterComponent from "./components/UI/FooterComponent.jsx";
import {Routes, Route, useNavigate} from "react-router-dom";
import DestinationsPage from "./components/DestinationsPage.jsx";
import NoMatch from "./components/UI/NoMatch.jsx";
import DestinationPageNoAccount from "./components/DestinationPageNoAccount.jsx";
import DestinationPageAccount from "./components/DestinationPageAccount.jsx";

import SignUp from "./features/authentification/SignUp.jsx";
import SignIn from "./features/authentification/SignIn.jsx";
import UserAccount from "./features/authentification/UserAccount.jsx";
import Layout from "./components/UI/Layout.jsx";
import RequireAuth from "./components/UI/RequireAuth.jsx";
import {useSelector} from "react-redux";
import {selectCurrentToken} from "./features/authentification/authSlice.js";

function App() {
    const navigate = useNavigate();
    const token = useSelector(selectCurrentToken)
    const [showNav, setShowNav] = useState(true);

    const navigateToSignUp = () => {
        setShowNav(false);
    };
    const shouldShowNav = showNav && location.pathname !== '/signUp' && location.pathname !== '/signIn';

    return (
        <div className="App">
            {shouldShowNav && <NavBar/>}

            <Routes>
                    //public
                <Route path={'/'} element={<HomePage/>}/>
                <Route path={'/destinations'} element={<DestinationsPage/>}/>
                {token ?
                    <>
                    <Route path={'/destinations/:id/:slug'} element={<DestinationPageAccount/>}/>
                    <Route path={"/userAccount"} element={<UserAccount/>}/>
                    </> :
                    <>
                <Route path={'/destinations/:id/:slug'} element={<DestinationPageNoAccount/>}/>
                    </>}
                <Route path={"/signUp"} element={<SignUp/>}/>
                <Route path={"/signIn"} element={<SignIn/>}/>

                <Route path={'*'} element={<NoMatch/>}/>

        </Routes>

    {
        shouldShowNav && <FooterComponent/>
    }
</div>
)
}

export default App
