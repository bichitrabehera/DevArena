"use client";

import React, { useEffect, useMemo, useState } from "react";
import Loader from "@/components/ui/Loader";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import HackathonCard from "@/components/HackathonCard";
const ITEMS_PER_PAGE = 6;

const HackathonsList = () => {
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(true);

  const [mode, setMode] = useState("all");
  const [city, setCity] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const res = await fetch(
          "https://hackathon-backend-3stq.onrender.com/hackathons"
        );

        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        setHackathons(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchList();
  }, []);

  // 🔎 FILTER LOGIC
  const filteredHackathons = useMemo(() => {
    return hackathons.filter((hackathon) => {
      const isOnline = hackathon.location?.toLowerCase() === "online";

      const modeMatch =
        mode === "all" ||
        (mode === "online" && isOnline) ||
        (mode === "offline" && !isOnline);

      const cityMatch =
        city.trim() === "" ||
        hackathon.location?.toLowerCase().includes(city.toLowerCase());

      return modeMatch && cityMatch;
    });
  }, [hackathons, mode, city]);

  // reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [mode, city]);

  // 📄 PAGINATION
  const totalPages = Math.ceil(filteredHackathons.length / ITEMS_PER_PAGE);

  const paginatedHackathons = filteredHackathons.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl py-6 px-6">
      {/* HEADER */}
      <h2 className="text-2xl font-semibold mb-2">Hackathons</h2>
      <p className="text-sm text-gray-600 mb-6">
        Discover upcoming hackathons from platforms around the world. Filter by
        participation mode and find the right opportunity to build, compete, and
        learn.
      </p>

      {/* FILTERS */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-8">
        <p className="text-sm text-gray-500 text-center sm:text-left">
          Filter hackathons by participation mode
        </p>

        <div className="flex gap-2 mx-auto sm:mx-0">
          {["all", "online", "offline"].map((value) => (
            <button
              key={value}
              onClick={() => setMode(value)}
              className={`px-4 py-1 text-sm rounded-2xl font-medium border border-black/20 transition ${
                mode === value
                  ? "bg-black text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {paginatedHackathons.map((hackathon) => (
          <HackathonCard key={hackathon.id} hackathon={hackathon} />
        ))}

        {/* EMPTY STATE */}
        {paginatedHackathons.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-sm text-gray-600">
              No hackathons found for the selected filters.
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Try switching between online and offline or clearing filters.
            </p>
          </div>
        )}
      </div>

      {/* PAGINATION INFO */}
      {totalPages > 1 && (
        <>
          <p className="text-xs text-gray-500 text-center mt-8">
            Showing page {currentPage} of {totalPages}
          </p>

          <Pagination className="mt-4">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                />
              </PaginationItem>

              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setCurrentPage((p) => Math.min(p + 1, totalPages))
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </>
      )}
    </div>
  );
};

export default HackathonsList;
