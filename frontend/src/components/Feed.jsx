import PostPreview from "./PostPreview";
const examplePosts = [
    {
        id: 1,
        userId: 101,
        username: "Sokka_Of_Water_Tribe",
        imageUrl: "../../sokka-post.jpg",
        caption: "On God I would kill for a steak",
        hashtags: ["waterTribe", "meatEater", "justJoking",],
        likes: 132,
        commentCount: 8,
        datePosted: "2015-07-30",
    },
    {
        id: 2,
        userId: 102,
        username: "Creeds_Thoughts",
        imageUrl: "../../creed-post.webp",
        caption: "I am standing on BIZNUS",
        hashtags: ["scranton", "electricCity",],
        likes: 0,
        commentCount: 0,
        datePosted: "2008-08-17",
    },
    {
        id: 3,
        userId: 103,
        username: "Mel_Medarda",
        imageUrl: "../../mel-post.webp",
        caption: "Just a girl living Top Side",
        hashtags: ["topSide", "sunrise", "piltover",],
        likes: 47,
        commentCount: 2,
        datePosted: "2025-12-12",
    },
];

function Feed({ title }) {
    return (
        <section>
            <h2>{title}</h2>
            <div>
                {examplePosts.map(post => (
                    <PostPreview key={post.id} post={post} />
                ))}
            </div>
        </section>
    );
}

export default Feed;