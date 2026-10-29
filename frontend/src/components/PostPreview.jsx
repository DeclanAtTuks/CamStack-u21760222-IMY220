import { Link } from "react-router-dom";
function PostPreview({ post }) {
    return (
        <div className="bg-pink-100 p-12 rounded-3xl w-full max-w-md text-center flex flex-col items-center justify-center">
            <Link to={`/post/${post._id}`}><img src={post.image} /></Link>
            <div>
                <Link to={`/profile/${post.author}`}>{post.author}</Link>
                <p>{post.caption}</p>
                <div>
                    <p> comments {post.comments}</p>
                    <p>{post.createdAt} </p>
                </div>
            </div>
        </div>
    );
}

export default PostPreview;