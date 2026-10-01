import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function EditProfile({ onSaved }) {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const [profilePicture, setProfilePicture] = useState("");
    const [bio, setBio] = useState("");
    const [error, setError] = useState("");
    useEffect(() => {
        if (!user) {
            navigate("/");
            return;
        }
        fetch(`http://localhost:1337/api/users/${user._id}`)
            .then(res => res.json())
            .then(data => {
                setBio(data.bio || "");
                setProfilePicture(data.profilePicture || "");
            })
            .catch(err => console.error(err));
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`http://localhost:1337/api/users/${user._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: user._id, bio, profilePicture })
            });
            const data = await res.json();
            if (!res.ok) return setError(data.error);
            onSaved();
        } catch (err) {
            setError("Could not reach server")
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <h2>Edit Profile</h2>
            <div>
                <label htmlFor="edit-profilePicture">profilePicture</label>
                <input id="edit-profilePicture" value={profilePicture} onChange={e => setProfilePicture(e.target.value)} />
            </div>
            <div>
                <label htmlFor="edit-bio">Bio</label>
                <textarea id="edit-bio" value={bio} onChange={e => setBio(e.target.value)} rows={3} />
            </div>
            <button type="submit">Save Changes</button>
            {error && <p>{error}</p>}
        </form>
    );
}

export default EditProfile;