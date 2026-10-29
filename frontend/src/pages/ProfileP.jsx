import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Friends from "../components/Friends";
import ProfileC from "../components/ProfileC";
import EditProfile from "../components/EditProfile";
import CreatePost from "../components/CreatePost";
import AllUserPosts from "../components/AllUserPosts";
import Albums from "../components/Albums";
import { useNavigate } from "react-router-dom";
function ProfileP() {
    const navigate = useNavigate();
    const savedUser = localStorage.getItem('user');
    useEffect(() => {
        if (savedUser === null) {
            navigate("/");
        }
    }, [navigate]);
    const { id } = useParams();
    const me = JSON.parse(localStorage.getItem("user"));
    const isOwn = (me && me._id === id);
    const [isEditing, setIsEditing] = useState(false);
    const handleSave = () => {
        setIsEditing(false);
    };
    return (
        <div className="profile-page" style={{ display: 'flex', flexDirection: 'column', width: "100vw", minHeight: "100vh" }}>
            <div className="flex flex-row flex-wrap items-start justify-start p-10 w-full gap-x-6 gap-y-6 border-8 border-b border-gray-600">
                <ProfileC userId={id} />
                {isOwn && <button type="button" className="w-32 max-w-xs h-8 mx-6 my-12 bg-orange-400 text-white hover:bg-orange-800 focus:ring-blue-500 rounded-xl font-medium  " onClick={() => setIsEditing(prev => !prev)}>{isEditing ? "Cancel" : "Edit Profile"}</button>}
                {isOwn && isEditing && <EditProfile onSaved={handleSave} />}
            </div>
            <div className="flex flex-row flex-wrap items-start justify-start p-10 w-full gap-x-6 gap-y-6 border-8 border-b border-gray-600">
                {isOwn && <CreatePost />}
                <AllUserPosts userId={id} />
            </div>
            <div className="flex flex-row flex-wrap items-start justify-start p-10 w-full gap-x-6 gap-y-6">
                <Albums userId={id} />
            </div>
            <div className="flex flex-row flex-wrap items-start justify-start p-10 w-full gap-x-6 gap-y-6 border-8 border-b border-gray-600" >
                <Friends userId={id} />
            </div>
        </div>
    );
}

export default ProfileP;