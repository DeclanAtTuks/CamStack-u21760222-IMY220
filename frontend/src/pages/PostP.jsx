import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import PostC from "../components/PostC";
import Image from "../components/Image";
import Comments from "../components/Comments";
import EditPost from "../components/EditPost";
import { useNavigate } from "react-router-dom";
function PostP() {
    const navigate = useNavigate();
    const savedUser = localStorage.getItem('user');
    const me = savedUser ? JSON.parse(savedUser) : null;
    useEffect(() => {
        if (!me) {
            navigate("/");
        }
    }, [navigate]);
    const { id } = useParams();
    const [isEditing, setIsEditing] = useState(false);
    const [post, setPost] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);
    useEffect(() => {
        async function fetchPost() {
            try {
                setLoading(true);
                setError("");
                const res = await fetch(`http://localhost:1337/api/posts/${id}`);
                const data = await res.json();
                if (!res.ok) {
                    throw new Error(data.error || "Could not load post.");
                }
                setPost(data);
            } catch (err) {
                setError(err.message || "Could not reach server.");
            } finally {
                setLoading(false);
            }
        }
        fetchPost();
    }, [id]);
    const handleSaved = (updatedPost) => {
        setPost(updatedPost);
        setIsEditing(false);
    };
    const handleDelete = async () => {
        if (!me?._id || !post) {
            setError("You must be signed in to delete a post.");
            return;
        }
        if (!window.confirm("Are you sure you want to delete this post?")) {
            return;
        }
        try {
            setDeleting(true);
            setError("");
            const res = await fetch(
                `http://localhost:1337/api/posts/${post._id}?userId=${me._id}`,
                { method: "DELETE" }
            );
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || "Failed to delete post.");
            }
            navigate(`/profile/${post.author}`);
        } catch (err) {
            setError(err.message || "Could not reach server.");
        } finally {
            setDeleting(false);
        }
    };
    if (loading) {
        return <p>Loading post...</p>;
    }
    if (error) {
        return <p>{error}</p>;
    }
    if (!post) {
        return <p>Post not found.</p>;
    }
    const isOwn = me && String(post.author) === String(me._id);
    return (
        <div>
            <Image imageUrl={post.image} caption={post.caption} />
            <PostC post={post} />
            {isOwn && (
                <>
                    <button type="button" className="w-32 max-w-xs h-8 mx-6 my-12 bg-orange-400 text-white hover:bg-orange-800 focus:ring-blue-500 rounded-xl font-medium " onClick={() => setIsEditing(prev => !prev)}>
                        {isEditing ? "Cancel" : "Edit Post"}
                    </button>
                    {isEditing && (<EditPost post={post} onSaved={handleSaved} />)}
                    <button type="button" disabled={deleting} className="w-32 max-w-xs h-8 mx-6 my-4 bg-orange-400 text-white hover:bg-orange-800 rounded-xl font-medium " onClick={handleDelete}>
                        {deleting ? "Deleting..." : "Delete Post"}
                    </button>
                </>
            )}
            {error && <p>{error}</p>}
            <Comments postId={post._id} />
        </div>
    );
}

export default PostP;