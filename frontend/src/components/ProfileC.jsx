import { useState, useEffect } from "react";
function ProfileC({ userId }) {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState("");
    useEffect(() => {
        fetch(`http://localhost:1337/api/users/${userId}`)
            .then(res => res.json())
            .then(setProfile)
            .catch(err => setError(err.message));
    }, [userId]);
    if (!profile) return <p>Loading---</p>
    return (
        <div>
            <img src={profile.profilePicture} />
            <h1>{profile.username}</h1>
            <p>{profile.bio}</p>
        </div>
    );
}

export default ProfileC;