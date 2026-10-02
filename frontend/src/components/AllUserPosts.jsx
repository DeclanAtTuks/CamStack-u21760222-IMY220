import PostPreview from "./PostPreview";
import { useEffect, useState } from "react";
function AllUserPosts({ userId }) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState("");
    async function fetchPosts() {
        try {
            setLoading(true);
            setErrors("");
            const response = await fetch(`http://localhost:1337/api/users/${userId}/posts`)
            if (!response.ok) {
                throw new Error("Failed to fetch posts");
            }
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error("Error fetching posts:", error);
            setErrors("Could not load posts. Please try again later.");
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchPosts();
    }, []);
    return (
        <section>
            <h2>Posts</h2>
            <div>
                {posts.map(post => (
                    <PostPreview key={post._id} post={post} />
                ))}
                {errors && <p>{errors}</p>}
                {loading && <p>loading...</p>}
            </div>
        </section>
    );
}

export default AllUserPosts;