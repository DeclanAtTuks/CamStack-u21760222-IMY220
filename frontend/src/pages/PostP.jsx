import { useParams } from "react-router-dom";
import { useState } from "react";
import PostC from "../components/PostC";
import Image from "../components/Image";
import Comments from "../components/Comments";
import EditPost from "../components/EditPost";

function PostP() {
    const { id } = useParams();
    const [isEditing, setIsEditing] = useState(false);
    return (
        <div>
            <Image imageUrl={postToDisplay.imageUrl} caption={postToDisplay.caption} />
            <PostC post={id} />
            <button type="button" className="w-32 max-w-xs h-8 mx-6 my-12 bg-orange-400 text-white hover:bg-orange-800 focus:ring-blue-500 rounded-xl font-medium " onClick={() => setIsEditing(prev => !prev)}>
                {isEditing ? "Cancel" : "Edit Post"}
            </button>
            {isEditing && <EditPost />}

            <Comments />
        </div>
    );
}

export default PostP;