import React from "react"; 

function Search({ handleInput, search }) {
  return (
    <section className="search">
      <input 
        className="search-box" 
        placeholder="Search for a movie" 
        type="text"
        autoFocus={true} 
        onChange={handleInput}
        onKeyPress={search}
      />
      <i className="fas fa-search fa-xs"></i>
    </section>
  )
}

export default Search; 