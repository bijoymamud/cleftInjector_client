import React, { useState, useMemo } from "react";
import { Search, Clock, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router";
import {
  useAcceptConsultationMutation,
  useCancelConsultationMutation,
  useGetAllConsultationQuery,
} from "@/redux/features/baseApi";
import { toast, Toaster } from "sonner";

const PAGE_SIZE = 5;

export default function Consultation() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { data: consultationData = [] } = useGetAllConsultationQuery();
  const [cancelConsultation] = useCancelConsultationMutation();
  const [acceptConsultation] = useAcceptConsultationMutation();

  const filteredConsultations = useMemo(() => {
    let filtered = consultationData;

    if (activeFilter !== "All") {
      filtered = filtered.filter(
        (c) => c.status.toLowerCase() === activeFilter.toLowerCase()
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((c) => {
        const name = (c.patient_name || "").toLowerCase();
        const reason = (c.reason || "").toLowerCase();
        return name.includes(query) || reason.includes(query);
      });
    }

    return filtered;
  }, [consultationData, activeFilter, searchQuery]);

  const totalItems = filteredConsultations.length;
  const totalPages = Math.ceil(totalItems / PAGE_SIZE);

  React.useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    } else if (totalPages === 0) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return filteredConsultations.slice(start, end);
  }, [filteredConsultations, currentPage]);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, 5);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  const handleCancelConsultation = async (id) => {
    try {
      const response = await cancelConsultation({
        id,
        status: "canceled_by_injector",
      }).unwrap();
      toast.success(response?.message || "Consultation Canceled");
    } catch (error) {
      toast.error(error?.data?.detail || "Error: Try again");
    }
  };

  const handleAcceptConsultation = async (id) => {
    try {
      const response = await acceptConsultation({
        id,
        status: "confirmed",
      }).unwrap();
      toast.success(response?.message || "Consultation Accepted");
    } catch (error) {
      toast.error(error?.data?.message || "Error: Try again");
    }
  };

  return (
    <div className="min-h-screen">
      <div>
        <Toaster
          richColors
          position="bottom-right"
          toastOptions={{
            success: { className: "bg-green-600 text-white" },
            error: { className: "bg-red-600 text-white" },
          }}
        />

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
            Consultation Management
          </h1>
          <p className="text-sm sm:text-base text-gray-500 mt-1">
            Manage your patient consultations and bookings
          </p>
        </div>

        {/* Search & Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by patient name or reason"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10 border-gray-300 focus:border-orange-500 h-11 text-sm"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              {["All", "Pending", "Confirmed", "Completed"].map((filter) => (
                <Button
                  key={filter}
                  variant={activeFilter === filter ? "default" : "outline"}
                  onClick={() => {
                    setActiveFilter(filter);
                    setCurrentPage(1);
                  }}
                  className={`text-xs sm:text-sm h-9 px-3 sm:px-4 ${
                    activeFilter === filter
                      ? "bg-orange-500 hover:bg-orange-600 text-white"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  {filter}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Consultation List */}
        <div className="space-y-4 sm:space-y-6">
          {paginatedData.length === 0 ? (
            <div className="text-center py-12 text-gray-500 text-sm sm:text-base">
              No consultations found matching your criteria.
            </div>
          ) : (
            paginatedData.map((consultation) => (
              <div
                key={consultation.id}
                className="bg-orange-50/50 border border-orange-100 rounded-xl p-4 shadow-sm hover:shadow transition-shadow"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Patient Image */}
                  <img
                    src={
                      consultation?.patient_image ||
                      "https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvczc3LW1ja2luc2V5LTc2MTEtcG9tXzMuanBn.jpg"
                    }
                    alt={consultation?.patient_name}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover flex-shrink-0 mx-auto sm:mx-0"
                  />

                  {/* Content */}
                  <div className="flex-1 min-w-0 text-center sm:text-left">
                    {/* Name + Status */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900 text-lg truncate">
                        {consultation.patient_name}
                      </h3>
                      <span
                        className={`px-2 py-1 capitalize rounded-full text-xs font-medium w-fit mx-auto sm:mx-0 ${
                          consultation.status === "pending"
                            ? "bg-orange-500 text-white"
                            : consultation.status === "confirmed"
                            ? "bg-green-500 text-white"
                            : consultation.status === "cancelled"
                            ? "bg-gray-400 text-white"
                            : "bg-gray-300 text-gray-700"
                        }`}
                      >
                        {consultation.status}
                      </span>
                    </div>

                    {/* Date & Location */}
                    <div className="flex flex-col sm:flex-row gap-3 text-xs sm:text-sm text-gray-600 mb-3">
                      <div className="flex items-center justify-center sm:justify-start gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>
                          {new Date(
                            consultation?.appointment_datetime
                          ).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}{" "}
                          •{" "}
                          {new Date(
                            consultation?.appointment_datetime
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      <div className="flex items-center justify-center sm:justify-start gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{consultation.location || "Los Angeles"}</span>
                      </div>
                    </div>

                    {/* Reason */}
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Reason:</span>{" "}
                      <span className="text-gray-900">
                        {consultation.reason}
                      </span>
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-row sm:flex-col gap-2 justify-center sm:justify-start mt-3 sm:mt-0">
                    <Link
                      to={`/provider/consultation_details/${consultation?.id}`}
                      state={consultation}
                      className="flex-1 sm:flex-initial"
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full text-xs h-9 border-orange-500 text-orange-600 hover:bg-orange-50"
                      >
                        View Details
                      </Button>
                    </Link>

                    {consultation.status === "pending" && (
                      <>
                        <Button
                          onClick={() =>
                            handleAcceptConsultation(consultation?.id)
                          }
                          size="sm"
                          className="w-full text-xs h-9 bg-orange-500 hover:bg-orange-600 text-white"
                        >
                          Accept
                        </Button>
                        <Button
                          onClick={() =>
                            handleCancelConsultation(consultation?.id)
                          }
                          size="sm"
                          variant="outline"
                          className="w-full text-xs h-9 text-red-600 border-red-300 hover:bg-red-50"
                        >
                          Cancel
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col items-center gap-3 mt-8">
            <div className="flex items-center justify-center gap-1 flex-wrap">
              <Button
                variant="outline"
                size="icon"
                className="w-9 h-9 rounded-full"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>

              {getPageNumbers().map((page, idx) =>
                page === "..." ? (
                  <span
                    key={`ellipsis-${idx}`}
                    className="px-2 text-gray-500 text-sm"
                  >
                    ...
                  </span>
                ) : (
                  <Button
                    key={page}
                    variant="outline"
                    size="sm"
                    className={`w-9 h-9 rounded-full text-sm ${
                      currentPage === page
                        ? "bg-orange-500 text-white hover:bg-orange-600"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Button>
                )
              )}

              <Button
                variant="outline"
                size="icon"
                className="w-9 h-9 rounded-full"
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Result Count */}
            <p className="text-xs sm:text-sm text-gray-500">
              Showing {(currentPage - 1) * PAGE_SIZE + 1} to{" "}
              {Math.min(currentPage * PAGE_SIZE, totalItems)} of {totalItems}{" "}
              results
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
