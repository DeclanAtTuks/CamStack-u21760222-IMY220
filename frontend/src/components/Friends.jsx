import { useState } from "react";
import ProfilePreview from "./ProfilePreview";

const placeholderFriends = [
    { id: 101, username: "Sokka_Of_Water_Tribe", profilePicture: "../../sokka-profile-pic.webp", friendCount: 15, },
    { id: 102, username: "Creeds_Thoughts", profilePicture: "../../creed-profile-pic.webp", friendCount: 1, },
    { id: 103, username: "Mel_Medarda", profilePicture: "../../mel-profile-pic.jpg", friendCount: 4, },
];
function Friends() {
    const [searchTerm, setSearchTerm] = useState("");
    function handleSearchChange(event) {
        setSearchTerm(event.target.value);
    }
    const filteredFriends = placeholderFriends.filter(friend =>
        friend.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <div>
            <h2>Friends</h2>
            <input type="search" placeholder="Search friends" value={searchTerm} onChange={handleSearchChange} />
            <div>
                {filteredFriends.map(friend => (
                    <ProfilePreview key={friend.id} profile={friend} />
                ))}
            </div>
            {filteredFriends.length === 0 && <p>No friends match your search.</p>}
        </div>
    );
}

export default Friends;