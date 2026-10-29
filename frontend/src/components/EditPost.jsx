import { useState, useEffect } from "react";
function EditPost({ post, onSaved }) {
    const user = JSON.parse(localStorage.getItem("user"));
    const [caption, setCaption] = useState(post.caption || "");
    const [hashtags, setHashtags] = useState((Array.isArray(post.hashtags) ? post.hashtags : []).join(" "));
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);
    useEffect(() => {
        setCaption(post.caption || "");
        setHashtags(
            (Array.isArray(post.hashtags) ? post.hashtags : []).join(" ")
        );
    }, [post]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (!user) {
            setError("Please log in to edit a post.");
            return;
        }
        const hashtagArray = hashtags.split(/[,\s]+/).filter(Boolean).map(tag => tag.replace(/^#/, ""));
        try {
            setSaving(true);
            const res = await fetch(`http://localhost:1337/api/posts/:${post._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: user._id, caption, hashtags: hashtagArray })
            });
            const data = await res.json();
            if (!res.ok) return setError(data.error);
            onSaved(data);
        } catch (err) {
            setError("Could not reach server");
        } finally {
            setSaving(false);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <h2>Edit Post</h2>
            <div>
                <label htmlFor="edit-post-caption">Caption</label>
                <textarea id="edit-post-caption" className="bg-slate-200 mx-6" value={caption} onChange={e => setCaption(e.target.value)} rows={3} />
            </div>
            <div>
                <label htmlFor="edit-post-hashtags">Hashtags</label>
                <input id="edit-post-hashtags" className="bg-slate-200 mx-6" type="text" value={hashtags} onChange={e => setHashtags(e.target.value)} />
            </div>
            <button type="submit" disabled={saving} className="w-36 max-w-xs h-12 bg-orange-400 text-white hover:bg-orange-800 focus:ring-blue-500 rounded-xl font-medium ">{saving ? "Saving..." : "Save Changes"}</button>
            {error && <p>{error}</p>}
        </form>
    );
}

export default EditPost;