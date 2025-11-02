"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import PageBanner from "../../components/search/PageBanner";
import SearchShell from "../../components/search/SearchShell";

const Search = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const query = searchParams.get("q");
    setSearchQuery(query || "");
  }, [searchParams]);

  return (
    <ProtectedRoute>
      <div className="w-full">
        <div className="container mx-auto p-4">
          <PageBanner query={searchQuery} />
          <SearchShell initialQuery={searchQuery} />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Search;
