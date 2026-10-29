import { useState } from "react";
function Search() {
    const [searchVal, setSearchVal] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
    }
    return (
        <form onSubmit={handleSubmit} role="search">
            <label htmlFor="searchFunction">Search</label>
            <input id="searchFunction" className="bg-slate-200 mx-6" type="search" placeholder="search something" value={searchVal} onChange={e => setSearchVal(e.target.value)} />
            <button type="submit" className="w-32 max-w-xs h-8 mx-6 my-12 bg-orange-400 text-white hover:bg-orange-800 focus:ring-blue-500 rounded-xl font-medium ">Search</button>
        </form>
    );
}

export default Search;