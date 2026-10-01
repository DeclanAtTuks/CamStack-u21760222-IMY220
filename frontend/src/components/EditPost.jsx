import { useState } from "react";
function EditPost() {
    const user = JSON.parse(localStorage.getItem("user"));
    const [caption, setCaption] = useState("");
    const [hashtags, setHashtags] = useState("");
    const [error, setError] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`http://localhost:1337/api/posts/:${user._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: user._id, caption: caption, hashtags: hashtags })
            });
            const data = await res.json();
            if (!res.ok) return setError(data.error);
            onSaved();
        } catch (err) {
            setError("Could not reach server")
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <h2>Edit Post</h2>
            <div>
                <label htmlFor="edit-post-caption">Caption</label>
                <textarea id="edit-post-caption" value={caption} onChange={e => setCaption(e.target.value)} rows={3} />
            </div>
            <div>
                <label htmlFor="edit-post-hashtags">Hashtags</label>
                <input id="edit-post-hashtags" type="text" value={hashtags} onChange={e => setHashtags(e.target.value)} />
            </div>
            <button type="submit">Save Changes</button>
            {error && <p>{error}</p>}
        </form>
    );
}

export default EditPost;