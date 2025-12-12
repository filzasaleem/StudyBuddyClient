// SearchPage.tsx
import React, { useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import Home from "../home/Home";
import "@/components/styles/searchPage.css";

export default function SearchPage() {
  const navigate = useNavigate();
  const searchParams = useSearch({ from: "/search" });

  const [query, setQuery] = useState(searchParams.q ?? "");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    navigate({
      to: "/search",
      search: { q: value },
    });
  };

  return (
    <div className="searchpage">
      <div className="search-header">
        <h1>Find Partners</h1>
        <p>Discover students studying similar subjects.</p>
      </div>

      <div className="searchbox">
        <input
          type="text"
          placeholder="Search subjects…"
          value={query}
          onChange={handleSearch}
        />
        
      </div>

      <Home searchQuery={query} />
    </div>
  );
}
