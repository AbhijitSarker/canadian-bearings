"use client";

import React from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import PageBanner from "../../components/search/PageBanner";
import SearchShell from "../../components/search/SearchShell";

const Search = () => {
  return (
    <ProtectedRoute>
      <div className="w-full">
        <div className="container mx-auto p-4">
          <PageBanner />
          <SearchShell />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Search;
