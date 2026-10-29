import { Link, useNavigate } from "react-router-dom";
function Navigation() {
    const navigate = useNavigate();
    const me = JSON.parse(localStorage.getItem("user"));
    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/");
    };
    return (
        <nav>
            <Link to="/home" className="navLink"><img src="/logo.png" alt="" /></Link>
            <Link to="/home" className="navLink"><h2>CAMSTACK</h2></Link>
            <Link to="/home" className="navLink">Home</Link>
            <Link to="/global" className="navLink">Global</Link>
            <Link to="/friends" className="navLink">friends</Link>
            <Link to={`/profile/${me._id}`} className="navLink">Profile</Link>
            <button type="button" className="w-32 max-w-xs h-8 mx-6 my-12 bg-orange-400 text-white hover:bg-orange-800 focus:ring-blue-500 rounded-xl font-medium  " onClick={handleLogout}>Log out</button>
        </nav>
    );
}

export default Navigation;