import React from "react";
import SearchHero from "../../components/search/searchHero";
import SearchShell from "../../components/search/SearchShell";

const Search = () => {
  return (
    <div className="w-full">
      <SearchHero />

      {/* Main content area where search results and filters live */}
      <main>
        <SearchShell />
      </main>
    </div>
  );
};

export default Search;
