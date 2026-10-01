import { useState } from "react";
import { useParams } from "react-router-dom";
import Friends from "../components/Friends";
import ProfileC from "../components/ProfileC";
import EditProfile from "../components/EditProfile";
import CreatePost from "../components/CreatePost";
import AllUserPosts from "../components/AllUserPosts";

function ProfileP() {
    const { id } = useParams();
    const me = JSON.parse(localStorage.getItem("user"));
    const isOwn = (me && me._id === id);
    const [isEditing, setIsEditing] = useState(false);
    const handleSave = () => {
        setIsEditing(false);
    };
    return (
        <div>
            <ProfileC userId={id} />
            {isOwn && <button type="button" onClick={() => setIsEditing(prev => !prev)}>{isEditing ? "Cancel" : "Edit Profile"}</button>}
            {isOwn && isEditing && <EditProfile onSaved={handleSave} />}
            {isOwn && <CreatePost />}
            <AllUserPosts userId={id} />
            <Friends userId={id} />
        </div>
    );
}

export default ProfileP;