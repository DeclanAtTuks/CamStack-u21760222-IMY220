import { Link } from "react-router-dom";
function PostPreview({ post }) {
    return (
        <div>
            <Link to={`/post/${post.id}`}><img src={post.imageUrl} /></Link>
            <div>
                <Link to={`/profile/${post.userId}`}>{post.username}</Link>
                <p>{post.caption}</p>
                <div>
                    {post.hashtags.map(tag => (
                        <span key={tag}><Link to="*">#{tag}</Link></span>
                    ))}
                    <p>{post.likes} likes </p>
                    <p>{post.commentCount} comments </p>
                    <p>{post.datePosted} </p>
                </div>
            </div>
        </div>
    );
}

export default PostPreview;