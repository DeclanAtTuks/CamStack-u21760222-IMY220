import { useState, useEffect } from "react";
function PostC({ post }) {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!post?.author) return;
        async function fetchProfile() {
            try {
                setError("");
                setProfile(null);
                const res = await fetch(`http://localhost:1337/api/users/${post.author}`);
                const data = await res.json();
                if (!res.ok) {
                    throw new Error(data.error || "Failed to load profile.");
                }
                setProfile(data);
            } catch (err) {
                setError(err.message || "Could not load profile.");
            }
        }
        fetchProfile();
    }, [post?.author]);
    if (error) return <p>{error}</p>;
    if (!profile) return <p>Loading profile...</p>;
    const hashtags = Array.isArray(post.hashtags) ? post.hashtags : typeof post.hashtags === "string" ? post.hashtags.split(/[,\s]+/).filter(Boolean).map(tag => tag.replace(/^#/, "")) : [];
    return (
        <div>
            <p>{profile.username}</p>
            <p>{post.caption}</p>
            <div>
                {hashtags.map((tag, index) => (
                    <span key={`${tag}-${index}`}>#{tag} </span>
                ))}
            </div>
            <div>
                <span>{post.createdAt}</span>
            </div>
        </div>
    );
}

export default PostC;