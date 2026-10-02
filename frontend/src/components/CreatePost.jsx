import { useState } from "react";

function CreatePost() {
    const user = JSON.parse(localStorage.getItem("user"));
    const [caption, setCaption] = useState("");
    const [hashtags, setHashtags] = useState("");
    const [error, setError] = useState("");
    const [image, setImage] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:1337/api/posts/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ author: user._id, username: user.username, caption: caption, image: image, hashtags: hashtags })
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
            <h2>Create Post</h2>
            <div>
                <label htmlFor="post-image">Image</label>
                <input id="post-image" value={image} onChange={e => setImage(e.target.value)} />
            </div>
            <div>
                <label htmlFor="post-caption">Caption</label>
                <textarea id="post-caption" value={caption} onChange={e => setCaption(e.target.value)} rows={3} />
            </div>
            <div>
                <label htmlFor="post-hashtags">Hashtags</label>
                <input id="post-hashtags" type="text" placeholder="" value={hashtags} onChange={e => setHashtags(e.target.value)} />
            </div>
            <button type="submit">Post</button>
            {error && <p>{error}</p>}
        </form>
    );
}

export default CreatePost;