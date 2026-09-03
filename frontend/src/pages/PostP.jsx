import { useParams } from "react-router-dom";
import { useState } from "react";
import PostC from "../components/PostC";
import Image from "../components/Image";
import Comments from "../components/Comments";
import EditPost from "../components/EditPost";

const examplePosts = [
    {
        id: 1,
        userId: 101,
        username: "Sokka_Of_Water_Tribe",
        imageUrl: "../../sokka-post.jpg",
        caption: "On God I would kill for a steak",
        hashtags: ["waterTribe", "meatEater", "justJoking",],
        likes: 132,
        commentCount: 8,
        datePosted: "2015-07-30",
    },
    {
        id: 2,
        userId: 102,
        username: "Creeds_Thoughts",
        imageUrl: "../../creed-post.webp",
        caption: "I am standing on BIZNUS",
        hashtags: ["scranton", "electricCity",],
        likes: 0,
        commentCount: 0,
        datePosted: "2008-08-17",
    },
    {
        id: 3,
        userId: 103,
        username: "Mel_Medarda",
        imageUrl: "../../mel-post.webp",
        caption: "Just a girl living Top Side",
        hashtags: ["topSide", "sunrise", "piltover",],
        likes: 47,
        commentCount: 2,
        datePosted: "2025-12-12",
    },
];

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