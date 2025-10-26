import React from "react";
import PageBanner from "../../components/search/PageBanner";
import SearchShell from "../../components/search/SearchShell";

const Search = () => {
  return (
    <div className="w-full">
      <div className="container mx-auto">
        <PageBanner />
        <main>
          <SearchShell />
        </main>
      </div>
    </div>
  );
};

export default Search;
