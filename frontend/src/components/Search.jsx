import { useState } from "react";
import ProfilePreview from "./ProfilePreview";
function Search() {
    const [searchVal, setSearchVal] = useState("");
    const [results, setResults] = useState([]);
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        try {
            const res = await fetch(
                `http://localhost:1337/api/users?search=${searchVal}`
            );
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || "Failed to search users.");
            }
            setResults(data);
        } catch (err) {
            setError(err.message);
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit} role="search">
                <label htmlFor="searchFunction">Search</label>
                <input id="searchFunction" className="bg-slate-200 mx-6" type="search" placeholder="search something" value={searchVal} onChange={e => setSearchVal(e.target.value)} />
                <button type="submit" className="w-32 max-w-xs h-8 mx-6 my-12 bg-orange-400 text-white hover:bg-orange-800 focus:ring-blue-500 rounded-xl font-medium ">Search</button>
            </form>
            {error && <p>{error}</p>}
            {results.map(u => <ProfilePreview key={u._id} user={u} />)}
        </div>
    );
}

export default Search;