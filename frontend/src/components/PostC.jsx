function PostC({ post }) {
    return (
        <div>
            <p>{post.username}</p>
            <p>{post.caption}</p>
            <div>
                {post.hashtags.map(tag => (
                    <span key={tag}>#{tag}</span>
                ))}
            </div>
            <div>
                <span>{post.likes} likes</span>
                <span>{post.createdAt}</span>
            </div>
        </div>
    );
}

export default PostC;