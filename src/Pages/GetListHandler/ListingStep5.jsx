import { useState } from "react";
import { MoveRight } from "lucide-react";
import { baseUrlToBackend } from "@/redux/features/baseApi";

export const ListingStep5 = ({
  onBack,
  initialData,
  getAllData, // Now receives data from Redux
  clearAllData, // Now dispatches Redux clear action
}) => {
  const [selectedDays, setSelectedDays] = useState(
    initialData?.availabilities?.map((a) => a.day) || []
  );
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modal, setModal] = useState({ open: false, type: "", message: "" });

  const user_id = localStorage.getItem("user_id");

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ].map((d) => ({ label: d.slice(0, 3), value: d }));

  const timeOptions = Array.from({ length: 24 }, (_, i) => {
    const hour = i % 12 === 0 ? 12 : i % 12;
    const period = i < 12 ? "AM" : "PM";
    const value = `${i.toString().padStart(2, "0")}:00`;
    return { label: `${hour}:00 ${period}`, value };
  });

  const toggleDay = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const avail = selectedDays.map((d) => ({
        day: d,
        start_time: startTime,
        end_time: endTime,
      }));

      // Get all form data, including files (File objects)
      const payload = {
        ...getAllData(),
        availabilities: avail,
        user_id: user_id,
      };

      const fd = new FormData();

      // --- Append function to flatten nested objects/arrays including File objects ---
      const append = (obj, prefix = "") => {
        Object.entries(obj).forEach(([k, v]) => {
          const key = prefix ? `${prefix}[${k}]` : k;
          if (v instanceof File) {
            fd.append(key, v);
          } else if (Array.isArray(v)) {
            v.forEach((item, idx) => {
              // Handle nested array items
              if (item instanceof File) fd.append(`${key}[${idx}]`, item);
              else if (typeof item === "object" && item)
                append(item, `${key}[${idx}]`);
              else fd.append(`${key}[${idx}]`, String(item));
            });
          } else if (typeof v === "object" && v !== null) {
            // Recurse into nested objects
            append(v, key);
          } else {
            // Append primitive values
            fd.append(key, String(v));
          }
        });
      };
      // --- End Append function ---

      append(payload);

      const res = await fetch(`${baseUrlToBackend}injector/create/`, {
        method: "POST",
        // Do NOT set Content-Type header; FormData sets it correctly (multipart/form-data)
        body: fd,
      });

      console.log(res, "🚀 Submission Response");

      if (res.ok) {
        clearAllData(); // Clears Redux store
        setModal({
          open: true,
          type: "success",
          message: "Application submitted successfully!",
        });
      } else {
        const errorData = await res.json();
        console.error("Server Error:", errorData);
        setModal({
          open: true,
          type: "error",
          message:
            res?.status === 401
              ? "Unauthorized access. Please log in again."
              : errorData.message ||
                `Submission failed (Status: ${res.status})`,
        });
      }
    } catch (e) {
      console.error("❌ Submission Error:", e);
      setModal({
        open: true,
        type: "error",
        message: "Network error. Check your connection.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setModal({ open: false, type: "", message: "" });
  };

  return (
    <>
      <div className="space-y-8">
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold mb-2">Available Days</h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {days.map((d) => (
              <button
                key={d.value}
                type="button"
                onClick={() => toggleDay(d.value)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedDays.includes(d.value)
                    ? "bg-orange-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold mb-2">Time Slot</h3>
          <div className="flex items-center gap-6 max-w-md mx-auto">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Start</label>
              <select
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500"
              >
                {timeOptions.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="self-end pb-2 text-gray-500">—</div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">End</label>
              <select
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500"
              >
                {timeOptions.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <button
            onClick={onBack}
            className="px-8 py-2 rounded-md border border-gray-300 text-lg font-semibold"
          >
            Back
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || selectedDays.length === 0}
            className="bg-[#E26C29] hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed px-8 py-2 rounded-md flex items-center gap-2 text-white text-lg font-semibold transition-all"
          >
            {isSubmitting ? "Submitting..." : "Submit Application"}
            {!isSubmitting && <MoveRight className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-[2px]">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-lg">
            <div className="flex items-center gap-3 mb-4">
              {modal.type === "success" ? (
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              ) : (
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              )}
              <h3
                className={`text-xl font-bold ${
                  modal.type === "success" ? "text-green-800" : "text-red-800"
                }`}
              >
                {modal.type === "success" ? "Success!" : "Error!"}
              </h3>
            </div>

            <p className="text-gray-700 mb-6 text-lg">{modal.message}</p>

            <div className="flex justify-end gap-3">
              {modal.type === "error" && (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 font-medium transition disabled:opacity-50"
                >
                  Retry
                </button>
              )}
              <button
                onClick={closeModal}
                className={`px-5 py-2 rounded-md font-medium transition-all ${
                  modal.type === "success"
                    ? "bg-[#E26C29] text-white hover:bg-orange-600 shadow-sm"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                {modal.type === "success" ? "Close" : "Cancel"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

