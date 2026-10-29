import { useState } from "react";
import ProfilePreview from "./ProfilePreview";


function Friends({ userId }) {
    const [searchTerm, setSearchTerm] = useState("");
    function handleSearchChange(event) {
        setSearchTerm(event.target.value);
    }

    return (
        <div>
            <h2>Friends</h2>
            <input type="search" className="bg-slate-200 mx-6" placeholder="Search friends" id="friends-input" value={searchTerm} onChange={handleSearchChange} />
            <div>

            </div>

        </div>
    );
}

export default Friends;