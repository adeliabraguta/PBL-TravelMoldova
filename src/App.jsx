import {useState} from 'react'
import './App.css'
import NavBar from "./components/NavBar.jsx";
import HomePage from "./components/HomePage.jsx";
import FooterComponent from "./components/FooterComponent.jsx";
import {Routes, Route, useNavigate} from "react-router-dom";
import DestinationsComponent from "./components/DestinationsComponent.jsx";
import NoMatch from "./components/NoMatch.jsx";
import DestinationPage from "./components/DestinationPage.jsx";
import SignUp from "./components/SignUp.jsx";
import SignIn from "./components/SignIn.jsx";
import UserAccount from "./components/UserAccount.jsx";

function App() {
    const navigate = useNavigate();

    const [showNav, setShowNav] = useState(true);

    const navigateToSignUp = () => {
        setShowNav(false);
    };
    const shouldShowNav = showNav && location.pathname !== '/signUp' && location.pathname !== '/signIn';

    return (
        <div className="App">
            {shouldShowNav && <NavBar/>}

            <Routes>
                <Route path={'/'} element={<HomePage/>}/>
                <Route path={'/destinations'} element={<DestinationsComponent/>}/>
                <Route path={'/destinations/:id'} element={<DestinationPage/>}/>
                <Route path={"/signUp"} element={<SignUp/>}/>
                <Route path={"/signIn"} element={<SignIn/>}/>
                <Route path={"/userAccount"} element={<UserAccount/>}/>

                <Route path={'*'} element={<NoMatch/>}/>
            </Routes>

            {shouldShowNav  && <FooterComponent/>}
        </div>
    )
}

export default App
