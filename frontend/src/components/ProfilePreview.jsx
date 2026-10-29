import { Link } from "react-router-dom";
import Image from "./Image";
function ProfilePreview({ user }) {
    return (
        <div>
            <Link to={`/profile/${user.id}`}>
                <Image imageUrl={user.profilePicture} />
                <div>
                    <p>{user.username}</p>
                    <p>{user.bio}</p>
                </div>
            </Link>
        </div>
    );
}

export default ProfilePreview;