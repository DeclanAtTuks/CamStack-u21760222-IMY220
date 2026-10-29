import { Link } from "react-router-dom";
function Navigation() {
    const myAcc = JSON.parse(localStorage.getItem("user"));

    return (
        <nav>
            <Link to="/home" className="navLink"><img src="/logo.png" alt="" /></Link>
            <Link to="/home" className="navLink">Home</Link>
            <Link to="/global" className="navLink">Global</Link>
            <Link to="/friends" className="navLink">friends</Link>
            <Link to={`/profile/${myAcc._id}`} className="navLink">Profile</Link>
        </nav>
    );
}

export default Navigation;