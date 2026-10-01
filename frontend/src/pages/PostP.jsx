import { useParams } from "react-router-dom";
import { useState } from "react";
import PostC from "../components/PostC";
import Image from "../components/Image";
import Comments from "../components/Comments";
import EditPost from "../components/EditPost";

function PostP() {
    const { id } = useParams();
    const [isEditing, setIsEditing] = useState(false);
    const postToDisplay = examplePosts.find(post => post.id == id)
    return (
        <div>
            <Image imageUrl={postToDisplay.imageUrl} caption={postToDisplay.caption} />
            <PostC post={postToDisplay} />
            <button type="button" onClick={() => setIsEditing(prev => !prev)}>
                {isEditing ? "Cancel" : "Edit Post"}
            </button>
            {isEditing && <EditPost />}

            <Comments />
        </div>
    );
}

export default PostP;