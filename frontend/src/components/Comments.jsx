const postComments = [
    { id: 1, username: "User1", text: "Slay", datePosted: "2026-08-30" },
    { id: 2, username: "User2", text: "Cliterally Serving", datePosted: "2026-08-30" },
    { id: 3, username: "User3", text: "Eating with no crumbs left", datePosted: "2026-08-31" }
];

function Comments() {
    return (
        <div>
            <h2>Comments</h2>
            <ul>
                {postComments.map(comment => (
                    <li key={comment.id}>
                        <span>{comment.username}</span>
                        <p>{comment.text}</p>
                        <span>{comment.datePosted}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Comments;