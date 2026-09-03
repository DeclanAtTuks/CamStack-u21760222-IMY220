import { useState } from "react";

const myProfile = {
    id: 201,
    username: "You My Chyna Bean",
    profilePicture: "../../my-profile-pic.JPG",
    bio: "I put the cough in coffee",
    friendCount: 12,
    postCount: 8
};

function EditProfile() {
    const [username, setUsername] = useState(myProfile.username);
    const [bio, setBio] = useState(myProfile.bio);
    const [submitMessage, setSubmitMessage] = useState("");

    function handleUsernameChange(event) {
        setUsername(event.target.value);
    }
    function handleBioChange(event) {
        setBio(event.target.value);
    }
    function handleSubmit(event) {
        event.preventDefault();
        setSubmitMessage("Profile updated.");
    }
    return (
        <form onSubmit={handleSubmit}>
            <h2>Edit Profile</h2>
            <div>
                <label htmlFor="edit-username">Username</label>
                <input id="edit-username" type="text" value={username} onChange={handleUsernameChange} />
            </div>
            <div>
                <label htmlFor="edit-bio">Bio</label>
                <textarea id="edit-bio" value={bio} onChange={handleBioChange} rows={3} />
            </div>
            <button type="submit">Save Changes</button>
            {submitMessage && <p>{submitMessage}</p>}
        </form>
    );
}

export default EditProfile;