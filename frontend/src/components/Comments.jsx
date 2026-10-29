import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
function Comments({ postId }) {
    const me = JSON.parse(localStorage.getItem("user"));
    const [comments, setComments] = useState([]);
    const [text, setText] = useState("");
    const [error, setError] = useState("");
    const load = async () => {
        try {
            const res = await fetch(`http://localhost:1337/api/posts/${postId}/comments`);
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to load comments.");
            }

            setComments(data);
        } catch (err) {
            setError(err.message);
        }
    };
    useEffect(() => {
        load();
    }, [postId]);
    const handleAdd = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await fetch(`http://localhost:1337/api/posts/${postId}/comments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId: me._id,
                    text: text
                })
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || "Failed to add comment.");
            }
            setText("");
            await load();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDelete = async (commentId) => {
        setError("");
        try {
            const res = await fetch(`http://localhost:1337/api/comments/${commentId}?userId=${me._id}`,
                {
                    method: "DELETE"
                }
            );
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || "Failed to delete comment.");
            }
            await load();
        } catch (err) {
            setError(err.message);
        }
    };
    return (
        <div>
            <h2>Comments</h2>
            {comments.map(c => (
                <div key={c._id}>
                    <Link to={`/profile/${c.author}`}>{c.author}</Link>
                    <p>{c.text}</p>
                    {me && c.author === me._id && (
                        <button type="button" onClick={() => handleDelete(c._id)}>Delete</button>
                    )}
                </div>
            ))}
            {me && (
                <form onSubmit={handleAdd}>
                    <input value={text} className="bg-slate-200 mx-6" onChange={e => setText(e.target.value)} placeholder="Add a comment" />
                    <button type="submit">Post</button>
                </form>
            )}
            {error && <p>{error}</p>}
        </div>
    );
}

export default Comments;