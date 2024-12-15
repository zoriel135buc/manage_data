import React from "react";
import { useState } from "react";

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    const searchText = e.target.value;
    setQuery(searchText);
    onSearch(searchText);
  };
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search by name or email..."
        onChange={handleInputChange}
        style={{
          marginBottom: "20px",
          padding: "8px",
          width: "300px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />
    </div>
  );
};

export default Search;
