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

type Hackathon = {
  id: number;
  name: string;
  location?: string;
  prize?: string;
  participants?: string;
  start_date?: string | null;
  end_date?: string | null;
  platform?: string;
  link?: string;
};

const HackathonsList = () => {
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [loading, setLoading] = useState(true);

  const [mode, setMode] = useState("all");
  const [city, setCity] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const res = await fetch("/api/hackathons");

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

  const filteredHackathons = useMemo(() => {
    return hackathons.filter((hackathon) => {
      if (!hackathon.prize || hackathon.prize.trim() === "") return false;

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

  useEffect(() => {
    setCurrentPage(1);
  }, [mode, city]);

  const totalPages = Math.ceil(filteredHackathons.length / ITEMS_PER_PAGE);

  const paginatedHackathons = filteredHackathons.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
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
      <h2 className="text-2xl font-semibold mb-2 font-[Header]">Hackathons</h2>
      {/* <p className="text-sm text-gray-600 mb-6">
        Discover upcoming hackathons from platforms around the world. Filter by
        participation mode and find the right opportunity to build, compete, and
        learn.
      </p> */}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-8">
        <p className="text-sm text-gray-500 text sm:text-left">
          Filter hackathons by participation mode
        </p>

        <div className="flex mx-auto rounded  sm:mx-0 bg-gray-300">
          {["all", "online", "offline"].map((value) => (
            <button
              key={value}
              onClick={() => setMode(value)}
              className={`px-4 py-1 text-sm font-medium transition ${
                mode === value
                  ? " text-black border border-black/20"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {paginatedHackathons.map((hackathon) => (
          <HackathonCard key={hackathon.id} hackathon={hackathon} />
        ))}

        {paginatedHackathons.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-sm text-gray-600">
              No hackathons found for the selected filters.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Or try refreshing the page
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Try switching between online and offline or clearing filters.
            </p>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <>
          <p className="text-xs text-gray-500 text-center mt-8">
            Showing page {currentPage} of {totalPages}
          </p>

          <Pagination className="mt-4 mb-20">
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
