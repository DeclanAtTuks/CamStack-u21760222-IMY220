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
            {!showLogin && <button className="w-32 max-w-xs h-8 mx-6 my-12 bg-orange-400 text-white hover:bg-orange-800 focus:ring-blue-500 rounded-xl font-medium " onClick={displayLogin}>Login</button>}
            {!showSignUp && <button className="w-32 max-w-xs h-8 mx-6 my-12 bg-orange-400 text-white hover:bg-orange-800 focus:ring-blue-500 rounded-xl font-medium " onClick={displaySignUp}>Sign Up</button>}
            {showSignUp && <SignUp />}
            {showLogin && <Login />}
            <h3>A Website to Share your photos with others.</h3>
            <img src="Asset6.png" alt="" className="absolute -right-0 -top-0" />
            <img src="Asset7.png" alt="" className="absolute right-78 bottom-16" />
        </div>
    );
}

export default Splash;