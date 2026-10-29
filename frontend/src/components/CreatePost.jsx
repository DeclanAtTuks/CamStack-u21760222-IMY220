import { useState } from "react";

function CreatePost() {
    const me = JSON.parse(localStorage.getItem("user"));;
    const [caption, setCaption] = useState("");
    const [hashtags, setHashtags] = useState("");
    const [error, setError] = useState("");
    const [image, setImage] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (!image) {
            setError("Please choose an image.");
            return;
        }
        const form = e.target;
        const formData = new FormData();
        formData.append("image", image);
        formData.append("caption", caption);
        formData.append("author", me._id);
        formData.append("username", me.username);
        formData.append("hashtags", JSON.stringify(hashtags));
        try {
            const res = await fetch("http://localhost:1337/api/posts/", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            if (!res.ok) return setError(data.error);
            setCaption("");
            setHashtags("");
            setImage(null);
            form.reset();
        } catch (err) {
            setError("Could not reach server")
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <h2>Create Post</h2>
            <div>
                <label htmlFor="post-image">Image</label>
                <input id="post-image" type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} />
            </div>
            <div>
                <label htmlFor="post-caption">Caption</label>
                <textarea id="post-caption" value={caption} onChange={e => setCaption(e.target.value)} rows={3} />
            </div>
            <div>
                <label htmlFor="post-hashtags">Hashtags</label>
                <input id="post-hashtags" type="text" placeholder="" value={hashtags} onChange={e => setHashtags(e.target.value)} />
            </div>
            <button type="submit" className="w-32 max-w-xs h-8 mx-6 my-12 bg-orange-400 text-white hover:bg-orange-800 focus:ring-blue-500 rounded-xl font-medium ">Post</button>
            {error && <p>{error}</p>}
        </form>
    );
}

export default CreatePost;