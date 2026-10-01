import { useState } from "react";
import PostPreview from "./PostPreview";
import { useEffect } from "react";

function Feed({ title }) {
    const user = JSON.parse(localStorage.getItem("user"));
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState("");
    useEffect(() => {
        async function fetchPosts() {
            try {
                setLoading(true);
                setErrors("");
                setPosts([]);

                let url = "http://localhost:1337/api/posts";
                if (title === "Friends") {
                    const user = JSON.parse(localStorage.getItem("user"));
                    if (!user) {
                        setErrors("Please log in to see your friends' posts.");
                        return;
                    }
                    url = `http://localhost:1337/api/feed/local?userId=${user._id}`;
                }

                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("Failed to fetch posts");
                }
                const data = await response.json();
                setPosts(data);
            } catch (err) {
                console.error("Error fetching posts:", err);
                setErrors("Could not load posts. Please try again later.");
            } finally {
                setLoading(false);
            }
        }
        fetchPosts();
    }, [title]);
    return (
        <section>
            <h2>{title}</h2>
            <div>
                {posts.map(post => (
                    <PostPreview key={post._id} post={post} />
                ))}
            </div>
            {errors && <p>{errors}</p>}
            {loading && <p>loading...</p>}
        </section>
    );
}

export default Feed;