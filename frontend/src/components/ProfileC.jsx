import { useState, useEffect } from "react";
function ProfileC({ userId }) {
    const [profile, setProfile] = useState(null);
    useEffect(() => {
        fetch(`http://localhost:1337/api/users/${userId}`)
            .then(res => res.json())
            .then(setProfile)
            .catch(err => console.error(err));
    }, [userId]);
    if (!profile) return <p>Loading---</p>
    return (
        <div>
            <img src={profile.profilePicture} />
            <h1>{profile.username}</h1>
            <p>{profile.bio}</p>
            <div>
                <p>{profile.friendCount} friends </p>
                <p>{profile.postCount} posts </p>
            </div>
        </div>
    );
}

export default ProfileC;