// import { useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Clock, ArrowRight, ArrowLeft } from "lucide-react";
// import { useLocation } from "react-router";

// export default function BookingStep1({ onNext, onPrevious, initialData }) {
//   const [day, setSelectedDay] = useState(initialData?.day || null);
//   const location = useLocation();
//   const availability = location.state?.availability || {};

//   // Find the time slot for the selected day
//   const getTimeSlot = (dayId) => {
//     if (!availability || availability.length === 0)
//       return { start_time: "", end_time: "" };
//     const slot = availability.find(
//       (slot) => slot.day.toLowerCase() === dayId.toLowerCase()
//     );
//     return slot || { start_time: "", end_time: "" };
//   };

//   const isDayAvailable = (dayId) => {
//     if (!availability || availability.length === 0) return false;
//     return availability.some(
//       (slot) => slot.day.toLowerCase() === dayId.toLowerCase()
//     );
//   };

//   const days = [
//     { id: "Saturday", label: "Sat" },
//     { id: "Sunday", label: "Sun" },
//     { id: "Monday", label: "Mon" },
//     { id: "Tuesday", label: "Tue" },
//     { id: "Wednesday", label: "Wed" },
//     { id: "Thursday", label: "Thu" },
//     { id: "Friday", label: "Fri" },
//   ];

//   const handleNext = () => {
//     if (day && availability) {
//       onNext({ day });
//     }
//   };

//   const handlePrevious = () => {
//     if (onPrevious) {
//       onPrevious();
//     }
//   };

//   return (
//     <div className="w-full max-w-2xl mx-auto p-6">
//       <Card className="border-0 shadow-sm">
//         <CardContent className="p-8">
//           {/* Set Your Available Day Section */}
//           <div className="mb-8">
//             <h2 className="text-xl font-semibold text-gray-800 mb-2">
//               Set Your Available Day
//             </h2>
//             <p className="text-sm text-gray-500 mb-6">
//               Select your availability
//             </p>
//             <div className="grid grid-cols-4 gap-3">
//               {days.map((day) => {
//                 const isAvailable = isDayAvailable(day.id);
//                 return (
//                   <Button
//                     key={day.id}
//                     onClick={() => setSelectedDay(day.id)}
//                     variant="outline"
//                     disabled={!isAvailable}
//                     className={`h-11 font-medium text-sm cursor-pointer ${
//                       day === day.id
//                         ? "bg-orange-500 text-white border-orange-500 hover:bg-orange-600 hover:text-white"
//                         : isAvailable
//                         ? "bg-white text-green-700 border-green-300 hover:bg-green-200"
//                         : "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-50"
//                     }`}
//                   >
//                     {day.label}
//                   </Button>
//                 );
//               })}
//             </div>
//           </div>
//           {/* Available Time Slot Section */}
//           {day && (
//             <div>
//               <h2 className="text-xl font-semibold text-gray-800 mb-6">
//                 Available Time Slot
//               </h2>
//               <div className="grid grid-cols-2 gap-6">
//                 {/* Start Time */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-3">
//                     Start
//                   </label>
//                   <div className="relative">
//                     <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//                     <input
//                       type="text"
//                       disabled
//                       className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
//                       value={
//                         getTimeSlot(day).start_time
//                           ? new Date(
//                               `1970-01-01T${getTimeSlot(day).start_time}`
//                             ).toLocaleTimeString([], {
//                               hour: "2-digit",
//                               minute: "2-digit",
//                               hour12: true,
//                             })
//                           : ""
//                       }
//                     />
//                   </div>
//                 </div>
//                 {/* End Time */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-3">
//                     End
//                   </label>
//                   <div className="relative">
//                     <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//                     <input
//                       type="text"
//                       disabled
//                       className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
//                       value={
//                         getTimeSlot(day)?.end_time
//                           ? new Date(
//                               `1970-01-01T${getTimeSlot(day).end_time}`
//                             ).toLocaleTimeString([], {
//                               hour: "2-digit",
//                               minute: "2-digit",
//                               hour12: true,
//                             })
//                           : ""
//                       }
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//           {/* Navigation Buttons */}
//           <div className="flex justify-between items-center pt-8 mt-8 border-t border-gray-200">
//             {onPrevious && (
//               <Button
//                 onClick={handlePrevious}
//                 variant="outline"
//                 className="px-6 py-2 flex items-center gap-2 border-gray-300 hover:bg-gray-50"
//               >
//                 <ArrowLeft className="w-4 h-4" />
//                 <span className="font-semibold">Previous</span>
//               </Button>
//             )}
//             <div className="">
//               <button
//                 onClick={handleNext}
//                 disabled={!day}
//                 className={`px-8 py-2 flex rounded-md bg-[#E26C29] hover:bg-orange-600 cursor-pointer items-center gap-2 ml-auto ${
//                   !day
//                     ? "bg-gray-300 cursor-not-allowed"
//                     : "bg-orange-500 hover:bg-orange-600"
//                 } text-white font-semibold`}
//               >
//                 <span className="text-lg">Next</span>
//                 <ArrowRight className="w-4 h-4" />
//               </button>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// BookingStep1.jsx
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, ArrowRight, ArrowLeft } from "lucide-react";
import { useLocation } from "react-router";

export default function BookingStep1({ onNext, onPrevious, initialData }) {
  const [day, setSelectedDay] = useState(initialData?.day || null);
  const location = useLocation();
  const availability = location.state?.availability || {};

  // Find the time slot for the selected day
  const getTimeSlot = (dayId) => {
    if (!availability || availability.length === 0)
      return { start_time: "", end_time: "" };
    const slot = availability.find(
      (slot) => slot.day.toLowerCase() === dayId.toLowerCase()
    );
    return slot || { start_time: "", end_time: "" };
  };

  const isDayAvailable = (dayId) => {
    if (!availability || availability.length === 0) return false;
    return availability.some(
      (slot) => slot.day.toLowerCase() === dayId.toLowerCase()
    );
  };

  const days = [
    { id: "Saturday", label: "Sat" },
    { id: "Sunday", label: "Sun" },
    { id: "Monday", label: "Mon" },
    { id: "Tuesday", label: "Tue" },
    { id: "Wednesday", label: "Wed" },
    { id: "Thursday", label: "Thu" },
    { id: "Friday", label: "Fri" },
  ];

  const handleNext = () => {
    if (day && availability) {
      const timeSlot = getTimeSlot(day);
      onNext({
        day,
        startTime: timeSlot.start_time,
        endTime: timeSlot.end_time,
      });
    }
  };

  const handlePrevious = () => {
    if (onPrevious) {
      onPrevious();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <Card className="border-0 shadow-sm">
        <CardContent className="p-8">
          {/* Set Your Available Day Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Set Your Available Day
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Select your availability
            </p>
            <div className="grid grid-cols-4 gap-3">
              {days.map((dayItem) => {
                const isAvailable = isDayAvailable(dayItem.id);
                return (
                  <Button
                    key={dayItem.id}
                    onClick={() => setSelectedDay(dayItem.id)}
                    variant="outline"
                    disabled={!isAvailable}
                    className={`h-11 font-medium text-sm cursor-pointer ${
                      day === dayItem.id
                        ? "bg-orange-500 text-white border-orange-500 hover:bg-orange-600 hover:text-white"
                        : isAvailable
                        ? "bg-white text-green-700 border-green-300 hover:bg-green-200"
                        : "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-50"
                    }`}
                  >
                    {dayItem.label}
                  </Button>
                );
              })}
            </div>
          </div>
          {/* Available Time Slot Section */}
          {day && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Available Time Slot
              </h2>
              <div className="grid grid-cols-2 gap-6">
                {/* Start Time */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Start
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      disabled
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                      value={
                        getTimeSlot(day).start_time
                          ? new Date(
                              `1970-01-01T${getTimeSlot(day).start_time}`
                            ).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            })
                          : ""
                      }
                    />
                  </div>
                </div>
                {/* End Time */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    End
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      disabled
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                      value={
                        getTimeSlot(day)?.end_time
                          ? new Date(
                              `1970-01-01T${getTimeSlot(day).end_time}`
                            ).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            })
                          : ""
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Navigation Buttons */}
          <div className="flex justify-between items-center pt-8 mt-8 border-t border-gray-200">
            {onPrevious && (
              <Button
                onClick={handlePrevious}
                variant="outline"
                className="px-6 py-2 flex items-center gap-2 border-gray-300 hover:bg-gray-50"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="font-semibold">Previous</span>
              </Button>
            )}
            <div className="">
              <button
                onClick={handleNext}
                disabled={!day}
                className={`px-8 py-2 flex rounded-md bg-[#E26C29] hover:bg-orange-600 cursor-pointer items-center gap-2 ml-auto ${
                  !day
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-orange-500 hover:bg-orange-600"
                } text-white font-semibold`}
              >
                <span className="text-lg">Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
