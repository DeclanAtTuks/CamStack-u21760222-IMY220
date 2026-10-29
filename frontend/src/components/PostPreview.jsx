import { Link } from "react-router-dom";
function PostPreview({ post }) {
    const hashtags = Array.isArray(post.hashtags) ? post.hashtags : typeof post.hashtags === "string" ? post.hashtags.split(/[,\s]+/).filter(Boolean).map(tag => tag.replace(/^#/, "")) : [];
    return (
        <div className="bg-pink-100 p-12 rounded-3xl w-full max-w-md text-center flex flex-col items-center justify-center">
            <Link to={`/post/${post._id}`}><img src={post.image} className="max-w-full rounded-xl object-cover" /></Link>
            <div>
                <Link to={`/profile/${post.author}`}>{post.username}</Link>
                <p>{post.caption}</p>
                <p>
                    {hashtags.map((tag, index) => (
                        <span key={`${tag}-${index}`}>#{tag} </span>
                    ))}
                </p>
                <div>
                    <p> comments {post.comments ?? 0}</p>
                    <p>{post.createdAt} </p>
                </div>
            </div>
        </div>
    );
}

export default PostPreview;