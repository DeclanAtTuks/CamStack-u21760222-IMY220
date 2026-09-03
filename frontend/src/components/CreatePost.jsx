import { useState } from "react";

function CreatePost() {
    const [caption, setCaption] = useState("");
    const [hashtags, setHashtags] = useState("");
    const [submitMessage, setSubmitMessage] = useState("");

    function handleCaptionChange(event) {
        setCaption(event.target.value);
    }
    function handleHashtagsChange(event) {
        setHashtags(event.target.value);
    }
    function handleSubmit(event) {
        event.preventDefault();
        setSubmitMessage("Post created.");
        setCaption("");
        setHashtags("");
        setImageFile(null);
    }
    return (
        <form onSubmit={handleSubmit}>
            <h2>Create Post</h2>
            <div>
                <label htmlFor="post-image">Image</label>
                <input id="post-image" type="file" />
            </div>
            <div>
                <label htmlFor="post-caption">Caption</label>
                <textarea id="post-caption" value={caption} onChange={handleCaptionChange} rows={3} />
            </div>
            <div>
                <label htmlFor="post-hashtags">Hashtags</label>
                <input id="post-hashtags" type="text" placeholder="" value={hashtags} onChange={handleHashtagsChange} />
            </div>
            <button type="submit">Post</button>
            {submitMessage && <p>{submitMessage}</p>}
        </form>
    );
}

export default CreatePost;