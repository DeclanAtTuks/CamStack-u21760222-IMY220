import { Link } from "react-router-dom";
import Image from "./Image";
function ProfilePreview({ profile }) {
    return (
        <div>
            <Link to={`/profile/${profile.id}`}>
                <Image imageUrl={profile.profilePicture} />
                <div>
                    <p>{profile.username}</p>

                </div>
            </Link>
            <p>{profile.friendCount} friends</p>
        </div>
    );
}

export default ProfilePreview;