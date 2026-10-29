import Search from "../components/Search";
import Feed from "../components/Feed";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
function Home() {
    const navigate = useNavigate();
    const savedUser = localStorage.getItem('user');
    useEffect(() => {
        if (savedUser === null) {
            navigate("/");
        }
    }, [navigate]);
    return (
        <div>
            <h1>Home</h1>

            <Search />
            <Feed title="IN OUR LENS" />
            <div>

            </div>

        </div>
    );
}

export default Home;