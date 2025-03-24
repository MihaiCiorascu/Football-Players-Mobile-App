"use client";
import React from "react";
import styles from "./SearchBar.module.css";

const SearchBar = ({ onSearch, searchTerm }) => {
  const handleInputChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className={styles.searchContainer}>
      <img
        src="https://cdn-icons-png.flaticon.com/512/54/54481.png"
        alt="Search"
        className={styles.searchIcon}
      />
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search for a player"
        className={styles.searchInput}
        aria-label="Search for players"
      />
    </div>
  );
};

export default SearchBar;
