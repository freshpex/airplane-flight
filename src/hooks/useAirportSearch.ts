import { useState, useEffect, useCallback } from "react";
import { searchAirports } from "../data/airports";
import type { Airport } from "../data/airports";

interface UseAirportSearchResult {
  results: Airport[];
  isLoading: boolean;
  error: string | null;
  setQuery: (query: string) => void;
  selectedAirport: Airport | null;
  setSelectedAirport: (airport: Airport | null) => void;
}

export function useAirportSearch(): UseAirportSearchResult {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Airport[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedAirport, setSelectedAirport] = useState<Airport | null>(null);

  const searchHandler = useCallback((searchQuery: string) => {
    if (searchQuery.length < 2) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // This uses our local data, so it's synchronous, but we're keeping the
      // async pattern for consistency and in case we want to switch back to API
      setTimeout(() => {
        const searchResults = searchAirports(searchQuery);
        setResults(searchResults);
        setIsLoading(false);
      }, 200); // Simulate a short delay for a better UX
    } catch (err) {
      setError("Error searching airports");
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (query) {
        searchHandler(query);
      }
    }, 300); // Debounce input

    return () => {
      clearTimeout(handler);
    };
  }, [query, searchHandler]);

  return {
    results,
    isLoading,
    error,
    setQuery,
    selectedAirport,
    setSelectedAirport,
  };
}
