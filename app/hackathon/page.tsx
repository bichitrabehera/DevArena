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
import { Button } from "@/components/ui/button";
const ITEMS_PER_PAGE = 6;

type Hackathon = {
  id: string;
  name: string;
  location?: string;
  prize?: string;
  participants?: string;
  start_date?: string | null;
  end_date?: string | null;
  platform?: string;
  link?: string;
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
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
        const params = new URLSearchParams({
          limit: "100",
          offset: "0",
        });

        if (mode) {
          params.set("mode", mode);
        }

        if (city) {
          params.set("city", city);
        }

        const res = await fetch(`/api/hackathons?${params.toString()}`);

        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        setHackathons(Array.isArray(data) ? data : (data.data ?? []));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchList();
  }, [mode, city]);

  const filteredHackathons = useMemo(() => {
    return hackathons.filter((hackathon) => {
      const location = hackathon.location ?? "";
      const isOnline = location.toLowerCase() === "online";

      const modeMatch =
        mode === "all" ||
        (mode === "online" && isOnline) ||
        (mode === "offline" && !isOnline);

      const cityMatch =
        city.trim() === "" || location.toLowerCase().includes(city.toLowerCase());

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
      <div className="mb-8">
        <h2 className="text-2xl font-[Header] font-semibold text-gray-900 mb-1">
          Hackathons
        </h2>
        <p className="text-sm text-gray-500">
          Discover upcoming hackathons from platforms around the world.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Filter by mode</span>
          <div className="flex gap-1">
            {["all", "online", "offline"].map((value) => (
              <Button
                key={value}
                onClick={() => setMode(value)}
                className={`
                  px-3 py-1.5 text-xs font-medium rounded-md border transition ${
                    mode === value
                      ? "bg-blue-600 border-blue-600 text-white hover:bg-blue-700"
                      : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:text-blue-600"
                  }
                `}
              >
                {value.charAt(0).toUpperCase() + value.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search by city…"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full sm:w-48 px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {paginatedHackathons.map((hackathon) => (
          <HackathonCard key={hackathon.id} hackathon={hackathon} />
        ))}

        {paginatedHackathons.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
            <p className="text-sm text-gray-600 mb-2">
              No hackathons found for the selected filters.
            </p>
            <p className="text-xs text-gray-500">
              Try switching between online and offline or clearing filters.
            </p>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-10 flex items-center justify-between px-2">
          <p className="text-xs text-gray-500">
            Showing page {currentPage} of {totalPages}
          </p>

          <Pagination className="mt-2">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => {
                    setCurrentPage((p) => Math.max(p - 1, 1));
                    scrollToTop();
                  }}
                />
              </PaginationItem>

              <PaginationItem>
                <PaginationNext
                  onClick={() => {
                    setCurrentPage((p) => Math.min(p + 1, totalPages));
                    scrollToTop();
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default HackathonsList;
