import PostPreview from "./PostPreview";
const myPosts = [
    {
        id: 6,
        userId: 201,
        username: "You My Chyna Bean",
        imageUrl: "../../my-post-1.jpg",
        caption: "touch of class",
        hashtags: ["bday", "crackhead", "goodtimes"],
        likes: 132,
        commentCount: 8,
        datePosted: "2026-07-31"
    },
    {
        id: 7,
        userId: 201,
        username: "You My Chyna Bean",
        imageUrl: "../../my-post-2.jpg",
        caption: "Uni Time",
        hashtags: ["poop", "suffering"],
        likes: 88,
        commentCount: 15,
        datePosted: "2026-03-05"
    }
];

function AllUserPosts() {
    return (
        <section>
            <h2>Posts</h2>
            <div>
                {myPosts.map(post => (
                    <PostPreview key={post.id} post={post} />
                ))}
            </div>
        </section>
    );
}

export default AllUserPosts;