import { useState } from "react";
function EditPost() {
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
        setSubmitMessage("Post updated.");
    }
    return (
        <form onSubmit={handleSubmit}>
            <h2>Edit Post</h2>
            <div>
                <label htmlFor="edit-post-caption">Caption</label>
                <textarea id="edit-post-caption" value={caption} onChange={handleCaptionChange} rows={3} />
            </div>
            <div>
                <label htmlFor="edit-post-hashtags">Hashtags</label>
                <input id="edit-post-hashtags" type="text" value={hashtags} onChange={handleHashtagsChange} />
            </div>
            <button type="submit">Save Changes</button>
            {submitMessage && <p>{submitMessage}</p>}
        </form>
    );
}

export default EditPost;