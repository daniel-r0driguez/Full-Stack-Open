const SearchBar = ({searchEntry, handleSearchChange}) => {
    return (
        <div>
            find countries: <input value={searchEntry} onChange={handleSearchChange}/>
        </div>
    );
}

export default SearchBar;