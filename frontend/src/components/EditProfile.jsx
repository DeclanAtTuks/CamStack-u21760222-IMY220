import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function EditProfile({ onSaved }) {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const [currentPicture, setCurrentPicture] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [bio, setBio] = useState("");
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);
    useEffect(() => {
        if (!user) {
            navigate("/");
            return;
        }
        async function fetchProfile() {
            try {
                const res = await fetch(
                    `http://localhost:1337/api/users/${user._id}`
                );
                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.error || "Could not load profile.");
                }

                setBio(data.bio || "");
                setCurrentPicture(data.profilePicture || "");
            } catch (err) {
                setError(err.message || "Could not load profile.");
            }
        }

        fetchProfile();
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (!user) {
            setError("Please log in first.");
            return;
        }
        const formData = new FormData();
        formData.append("userId", user._id);
        formData.append("bio", bio);
        if (imageFile) {
            formData.append("profilePicture", imageFile);
        }
        try {
            setSaving(true);
            const res = await fetch(`http://localhost:1337/api/users/${user._id}`, {
                method: "PUT",
                body: formData
            });
            const data = await res.json();
            if (!res.ok) return setError(data.error);
            setCurrentPicture(data.profilePicture || currentPicture);
            setImageFile(null);

            if (onSaved) {
                onSaved(data);
            }
        } catch (err) {
            setError("Could not reach server")
        } finally {
            setSaving(false);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <h2>Edit Profile</h2>
            <div>
                <label htmlFor="edit-profilePicture">profilePicture</label>
                {imageFile ? (<p>Selected: {imageFile.name}</p>) : currentPicture ? (<img src={currentPicture} alt="Current profile" className="w-24 h-24 rounded-full object-cover" />) : (<p>No profile picture uploaded.</p>)}
                <input id="edit-profilePicture" className="bg-slate-200 mx-6" type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])} />
            </div>
            <div>
                <label htmlFor="edit-bio">Bio</label>
                <textarea id="edit-bio" className="bg-slate-200 mx-6" value={bio} onChange={e => setBio(e.target.value)} rows={3} />
            </div>
            <button type="submit" disabled={saving} className="w-32 max-w-xs h-8 mx-6 my-12 bg-orange-400 text-white hover:bg-orange-800 focus:ring-blue-500 rounded-xl font-medium "> {saving ? "Saving..." : "Save Changes"}</button>
            {error && <p>{error}</p>}
        </form>
    );
}

export default EditProfile;