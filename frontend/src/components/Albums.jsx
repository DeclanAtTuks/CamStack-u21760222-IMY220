import { useState, useEffect } from "react";
const emptyForm = { name: "", description: "" };
function Albums({ userId }) {
    const me = JSON.parse(localStorage.getItem("user"));
    const isOwn = me && me._id === userId;
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState(emptyForm);
    const [openAlbum, setOpenAlbum] = useState(null);
    const [albumPosts, setAlbumPosts] = useState([]);
    async function loadAlbums() {
        try {
            setLoading(true);
            const res = await fetch(`http://localhost:1337/api/albums?owner=${userId}`);
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to load albums");
            setAlbums(data);
        } catch (err) {
            console.error("Error loading albums:", err);
            setError("Could not load albums.");
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        loadAlbums();
    }, [userId]);
    const viewAlbum = async (album) => {
        try {
            const posts = await Promise.all(
                (album.posts || []).map(async (pid) => {
                    try {
                        const res = await fetch(
                            `http://localhost:1337/api/posts/${pid}`
                        );

                        const data = await res.json();

                        if (!res.ok) {
                            throw new Error(data.error || "Failed to load post.");
                        }

                        return data;
                    } catch (err) {
                        console.error("Error loading post:", err);
                        return null;
                    }
                })
            );

            setOpenAlbum(album);
            setAlbumPosts(posts.filter(Boolean));
        } catch (err) {
            setError(err.message);
        }
    };

    const removeFromAlbum = async (postId) => {
        try {
            const res = await fetch(
                `http://localhost:1337/api/albums/${openAlbum._id}/posts/${postId}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        userId: me._id
                    })
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to remove post from album.");
            }

            setAlbumPosts(prev =>
                prev.filter(p => p._id !== postId)
            );

            loadAlbums();
        } catch (err) {
            setError(err.message);
        }
    };
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
    const closeForm = () => {
        setIsEditing(false);
        setEditingId(null);
        setForm(emptyForm);
    };
    const startEdit = (album) => {
        setError("");
        setEditingId(album._id);
        setForm({
            name: album.name,
            description: album.description || "",
        });
        setIsEditing(true);
    };
    const handleCreate = async (e) => {
        e.preventDefault();
        setError("");
        if (!form.name.trim()) {
            setError("Album name is required.");
            return;
        }
        const body = {
            userId: me._id,
            name: form.name.trim(),
            description: form.description.trim(),
        };
        try {
            const res = await fetch("http://localhost:1337/api/albums", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.error || "Something went wrong.");
                return;
            }
            closeForm();
            loadAlbums();
        } catch (err) {
            console.error("Error saving album:", err);
            setError("Could not reach the server.");
        }
    };
    const handleEdit = async (e) => {
        e.preventDefault();
        setError("");
        if (!form.name.trim()) {
            setError("Album name is required.");
            return;
        }
        const body = {
            userId: me._id,
            name: form.name.trim(),
            description: form.description.trim(),
        };
        try {
            const res = await fetch(`http://localhost:1337/api/albums/${editingId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.error || "Something went wrong.");
                return;
            }
            closeForm();
            loadAlbums();
        } catch (err) {
            console.error("Error saving album:", err);
            setError("Could not reach the server.");
        }
    };
    const handleDelete = async (album) => {
        if (!window.confirm(`Delete the album "${album.name}"? Your posts will not be deleted.`)) return;
        setError("");
        try {
            const res = await fetch(`http://localhost:1337/api/albums/${album._id}?userId=${me._id}`, { method: "DELETE" });
            const data = await res.json();
            if (!res.ok) {
                setError(data.error || "Could not delete album.");
                return;
            }
            if (editingId === album._id) closeForm();
            loadAlbums();
        } catch (err) {
            console.error("Error deleting album:", err);
            setError("Could not reach the server.");
        }
    };

    return (
        <section className="flex flex-row flex-wrap items-start justify-start p-10 w-full gap-x-6 gap-y-6 border-8 border-b border-gray-600">
            <h2>Albums</h2>
            {isOwn && <form onSubmit={handleCreate}>
                <h3>Create Album</h3>
                <div>
                    <label htmlFor="album-name">Name</label>
                    <input id="album-name" className="bg-slate-200 mx-6" name="name" autoComplete="Album" value={form.name} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="album-description">Description</label>
                    <textarea className="bg-slate-200 mx-6" id="album-description" name="description" rows={3}
                        value={form.description} onChange={handleChange} />
                </div>
                <button type="submit" className="w-32 max-w-xs h-8 mx-6 my-12 bg-orange-400 text-white hover:bg-orange-800 focus:ring-blue-500 rounded-xl font-medium  ">Submit</button>
            </form>}
            {isOwn && isEditing && (
                <form onSubmit={handleEdit}>
                    <h3>Edit Album</h3>
                    <div>
                        <label htmlFor="album-name">Name</label>
                        <input id="album-name" className="bg-slate-200 mx-6" name="name" value={form.name} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="album-description">Description</label>
                        <textarea className="bg-slate-200 mx-6" id="album-description" name="description" rows={3}
                            value={form.description} onChange={handleChange} />
                    </div>
                    <button id="album-submit" type="submit" className="w-32 max-w-xs h-8 mx-6 my-12 bg-orange-400 text-white hover:bg-orange-800 focus:ring-blue-500 rounded-xl font-medium  ">Submit</button>
                    <button id="album-cancel" type="button" className="w-32 max-w-xs h-8 mx-6 my-12 bg-orange-400 text-white hover:bg-orange-800 focus:ring-blue-500 rounded-xl font-medium  " onClick={closeForm}>Cancel</button>
                </form>
            )}

            {error && <p>{error}</p>}
            {loading && <p>Loading albums...</p>}
            {!loading && albums.length === 0 && <p>No albums yet.</p>}

            <div className="bg-pink-100 p-12 rounded-3xl w-full max-w-md text-center flex flex-col items-center justify-center">
                {albums.map(album => (
                    <article key={album._id}>
                        <h3>{album.name}</h3>
                        {album.description && <p>{album.description}</p>}
                        <p>{album.posts?.length || 0} posts</p>
                        <button
                            type="button"
                            onClick={() => viewAlbum(album)}
                            className="w-32 max-w-xs h-8 mx-6 my-12 bg-orange-400 text-white hover:bg-orange-800 focus:ring-blue-500 rounded-xl font-medium  "
                        >
                            View posts
                        </button>
                        {isOwn && (
                            <div>
                                <button type="button" className="w-32 max-w-xs h-8 mx-6 my-12 bg-orange-400 text-white hover:bg-orange-800 focus:ring-blue-500 rounded-xl font-medium  " onClick={() => startEdit(album)}>Edit</button>
                                <button type="button" className="w-32 max-w-xs h-8 mx-6 my-12 bg-orange-400 text-white hover:bg-orange-800 focus:ring-blue-500 rounded-xl font-medium  " onClick={() => handleDelete(album)}>Delete</button>
                            </div>
                        )}
                    </article>
                ))}
            </div>
            {openAlbum && (
                <div>
                    <h3>{openAlbum.name}</h3>
                    {albumPosts.map(p => (
                        <div key={p._id}>
                            <PostPreview post={p} />
                            {isOwn && <button type="button" className="w-32 max-w-xs h-8 mx-6 my-12 bg-orange-400 text-white hover:bg-orange-800 focus:ring-blue-500 rounded-xl font-medium  " onClick={() => removeFromAlbum(p._id)}>Remove</button>}
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

export default Albums;