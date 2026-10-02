import { Link } from "react-router-dom";
function PostPreview({ post }) {
    return (
        <div>
            <Link to={`/post/${post._id}`}><img src={post.imageUrl} /></Link>
            <div>
                <Link to={`/profile/${post.author}`}>{post.author}</Link>
                <p>{post.caption}</p>
                <div>
                    <p>{post.comments} comments </p>
                    <p>{post.createdAt} </p>
                </div>
            </div>
        </div>
    );
}

export default PostPreview;