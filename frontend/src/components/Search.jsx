import { useState } from "react";
function Search() {
    const [searchVal, setSearchVal] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
    }
    return (
        <form onSubmit={handleSubmit} role="search">
            <label htmlFor="searchFunction">Search</label>
            <input id="searchFunction" type="search" placeholder="search something" value={searchVal} onChange={e => setSearchVal(e.target.value)} />
            <button type="submit">Search</button>
        </form>
    );
}

export default Search;