import React from "react";
import { BiSearch } from "react-icons/bi";
import "./Search.css";

const Search = ({ value, onChange, placeholder }) => {
  return (
    <div className="search_filter_section">
      <div className="search">
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        <BiSearch size={18} className="icon" />
      </div>
    </div>
  );
};

export default Search;
