import React, { useState } from "react";

export default function SearchBar() {
  const [searchFieldActive, setSearchFieldActive] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  const searchBarFocus = () => {
    setSearchFieldActive(true);
  };

  const searchBarNoFocus = () => {
    setSearchFieldActive(false);
  };

  return (
    <div className="search-container">
      <form className="search-box">
        <div
          className="search-bar"
          style={{
            border: `${
              searchFieldActive
                ? ".1rem solid var(--fm-primary-text"
                : ".1rem solid var(--fm-secondary-bg-color)"
            }`,
          }}
        >
          <i
            className="far fa-search search-magnify-icon"
            style={{
              color: `${
                searchFieldActive
                  ? "var(--fm-primary-text)"
                  : "var(--fm-primary-text-muted)"
              }`,
            }}
          ></i>
          <input
            type="text"
            className="search-input-field"
            placeholder="Search Flexomate..."
            onChange={handleSearchChange}
            value={searchText}
            onFocus={searchBarFocus}
            onBlur={searchBarNoFocus}
            onSubmit={handleSearchSubmit}
          />
        </div>
        <button
          type="submit"
          className="fm-primary-btn"
          style={{
            right: "0",
            borderRadius: "0",
            height: "2.7rem",
            padding: "0 5%",
          }}
          onClick={handleSearchSubmit}
        >
          Search
        </button>
      </form>
    </div>
  );
}
