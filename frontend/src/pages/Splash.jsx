import { Link } from "react-router-dom";
import { useState } from "react";
import SignUp from "../components/SignUp";
import Login from "../components/Login";
function Splash() {
    const [showLogin, setShowLogin] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    function displayLogin() {
        setShowLogin(!showLogin);
    }
    function displaySignUp() {
        setShowSignUp(!showSignUp);
    }
    return (
        <div>
            <h1>Welcome to CamStack</h1>
            {!showLogin && <button onClick={displayLogin}>Login</button>}
            {!showSignUp && <button onClick={displaySignUp}>Sign Up</button>}
            {showSignUp && <SignUp />}
            {showLogin && <Login />}
            <Link to="/home" >Go Home</Link>
        </div>
    );
}

export default Splash;