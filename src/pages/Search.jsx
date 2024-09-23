import React from "react";
import SearchBar from "@/components/search/SearchBar";

export default function Search() {
  document.title = "Flexiyo";

  return (
    <section id="search">
      <SearchBar />
    </section>
  );
}
