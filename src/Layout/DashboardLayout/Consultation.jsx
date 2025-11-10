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

  //cancel consultation function
  const handleCancelConsultation = async (id) => {
    try {
      console.log(id);

      const response = await cancelConsultation({
        id: id,
        status: "canceled_by_injector",
      }).unwrap();

      console.log(response, "Consultation canceled successfully");

      toast.success(response?.message || "Consultation Canceled");
    } catch (error) {
      console.error("Failed to cancel consultation:", error);
      toast.error(error?.data?.detail || "Error: Try again");
    }
  };

  //accept consultation function
  const handleAcceptConsultation = async (id) => {
    try {
      const response = await acceptConsultation({
        id: id,
        status: "confirmed",
      }).unwrap();

      toast.success(response?.message || "Consultation Canceled");
    } catch (error) {
      toast.error(error?.status || "Error: Try again");
    }
  };

  return (
    <div className="">
      <div className="container mx-auto">
        <Toaster
          richColors
          position="bottom-right"
          toastOptions={{
            success: { className: "bg-green-600 text-white" },
            error: { className: "bg-red-600 text-white" },
          }}
        />
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">
            Consultation Management
          </h1>
          <p className="text-base text-gray-500">
            Manage your patient consultations and bookings
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1 relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by patient name or reason"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10 border-gray-200 w-full"
              />
            </div>

            <div className="flex gap-2 flex-wrap">
              {["All", "Pending", "Confirmed", "Cancelled"].map((filter) => (
                <Button
                  key={filter}
                  variant={activeFilter === filter ? "default" : "outline"}
                  onClick={() => {
                    setActiveFilter(filter);
                    setCurrentPage(1);
                  }}
                  className={
                    activeFilter === filter
                      ? "bg-orange-500 hover:bg-orange-600 text-white hover:cursor-pointer"
                      : "hover:bg-gray-100 hover:cursor-pointer"
                  }
                >
                  {filter}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Consultation List */}
        <div className="space-y-6">
          {paginatedData.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              No consultations found matching your criteria.
            </div>
          ) : (
            paginatedData.map((consultation) => (
              <div
                key={consultation.id}
                className="bg-[#E26C290D] cursor-pointer rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={
                      consultation?.patient_image ||
                      "https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvczc3LW1ja2luc2V5LTc2MTEtcG9tXzMuanBn.jpg"
                    }
                    alt={consultation?.patient_name}
                    className="rounded-full w-[100px] h-[100px] object-cover"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900 text-xl truncate">
                        {consultation.patient_name}
                      </h3>
                      <span
                        className={`px-2 py-0.5 capitalize rounded-full text-[14px] font-semibold ${
                          consultation.status === "pending"
                            ? "bg-[#E26C29] text-white"
                            : consultation.status === "confirmed"
                            ? "bg-green-500 text-white"
                            : consultation.status === "cancelled"
                            ? "bg-gray-300 text-gray-700"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {consultation.status}
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-sm text-gray-600 mb-2">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>
                          {new Date(
                            consultation?.appointment_datetime
                          ).toLocaleDateString([], {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
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

                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{consultation.location || "Los Angeles"}</span>
                      </div>
                    </div>

                    <p className="text-base text-[#656464]">
                      Reason:{" "}
                      <span className="text-black">{consultation.reason}</span>
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-2 flex-shrink-0">
                    <Link
                      to={`/provider/consultation_details/${consultation?.id}`}
                      state={consultation}
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-orange-500 hover:text-orange-600 hover:bg-orange-50 border-orange-500"
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
                          className="bg-orange-500 hover:bg-orange-600 text-white hover:cursor-pointer"
                        >
                          Accept
                        </Button>
                        <Button
                          onClick={() =>
                            handleCancelConsultation(consultation?.id)
                          }
                          size="sm"
                          variant="outline"
                          className="text-red-500 cursor-pointer border-red-200 hover:bg-red-50"
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

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10 flex-wrap">
            {/* Prev Button */}
            <Button
              variant="outline"
              size="icon"
              className="w-8 h-8 rounded-full"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            {/* Page Numbers */}
            {getPageNumbers().map((page, idx) =>
              page === "..." ? (
                <span key={`ellipsis-${idx}`} className="text-gray-400 px-2">
                  ...
                </span>
              ) : (
                <Button
                  key={page}
                  variant="outline"
                  size="sm"
                  className={`w-8 h-8 rounded-full ${
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

            {/* Next Button */}
            <Button
              variant="outline"
              size="icon"
              className="w-8 h-8 rounded-full"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}

        {/* Optional: Show result count */}
        {totalItems > 0 && (
          <p className="text-center text-sm text-gray-500 mt-4">
            Showing {(currentPage - 1) * PAGE_SIZE + 1} to{" "}
            {Math.min(currentPage * PAGE_SIZE, totalItems)} of {totalItems}{" "}
            results
          </p>
        )}
      </div>
    </div>
  );
}
