import { useState } from "react";
import Friends from "../components/Friends";
import ProfileC from "../components/ProfileC";
import EditProfile from "../components/EditProfile";
import CreatePost from "../components/CreatePost";
import AllUserPosts from "../components/AllUserPosts";

function ProfileP() {
    const [isEditing, setIsEditing] = useState(false);
    return (
        <div>
            <ProfileC />
            <button type="button" onClick={() => setIsEditing(prev => !prev)}>{isEditing ? "Cancel" : "Edit Profile"}</button>
            {isEditing && <EditProfile />}
            <CreatePost />
            <AllUserPosts />
            <Friends />
        </div>
    );
}

export default ProfileP;