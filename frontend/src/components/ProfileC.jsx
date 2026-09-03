const myProfile = {
    id: 201,
    username: "You My Chyna Bean",
    profilePicture: "../../my-profile-pic.jpg",
    bio: "I put the cough in coffee",
    friendCount: 12,
    postCount: 8
};
function ProfileC() {
    return (
        <div>
            <img src={myProfile.profilePicture} />
            <h1>{myProfile.username}</h1>
            <p>{myProfile.bio}</p>
            <div>
                <p>{myProfile.friendCount} friends </p>
                <p>{myProfile.postCount} posts </p>
            </div>
        </div>
    );
}

export default ProfileC;