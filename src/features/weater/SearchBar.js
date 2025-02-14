import React from 'react';

const SearchBar = ({ setCity }) => {
  const handleSearch = (event) => {
    if (event.key === 'Enter') {
      setCity(event.target.value);
    }
  };

  return (
    <form>
      <input 
        type="text" 
        placeholder="Find a City"
        onKeyDown={handleSearch}
      />
    </form>
  );
}

export default SearchBar;
