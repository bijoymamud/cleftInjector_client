// import { MoveRight } from "lucide-react";
// import { useState } from "react";
// import { useForm } from "react-hook-form";

// export const ListingStep5 = ({ onSubmit, onBack, initialData }) => {
//   const { register, handleSubmit } = useForm({
//     defaultValues: initialData || {},
//   });

//   const [selectedDay, setSelectedDay] = useState(
//     initialData?.selectedDay || "mon"
//   );
//   const [selectedSlot, setSelectedSlot] = useState(
//     initialData?.selectedSlot || "8-9"
//   );

//   const handleFormSubmit = (data) => {
//     onSubmit({
//       ...data,
//       selectedDay,
//       selectedSlot,
//     });
//   };

//   const days = [
//     { id: "mon", label: "Mon", date: "26" },
//     { id: "tue", label: "Tue", date: "27" },
//     { id: "wed", label: "Wed", date: "28" },
//   ];

//   const timeSlots = [
//     { id: "8-9", label: "8-9 a.m." },
//     { id: "9-10", label: "9-10 a.m." },
//     { id: "10-11", label: "10-11 a.m." },
//   ];

//   return (
//     <div className="space-y-6">
//       <div className="bg-white rounded-lg border border-gray-200 p-6">
//         <h3 className="text-lg font-semibold mb-4">Set Your Available Days</h3>
//         <p className="text-sm text-gray-500 mb-6">When you available</p>

//         <div className="flex gap-4 mb-8">
//           {days.map((day) => (
//             <button
//               key={day.id}
//               type="button"
//               onClick={() => setSelectedDay(day.id)}
//               className={`flex flex-col items-center px-6 py-3 rounded-lg border-2 transition-colors ${
//                 selectedDay === day.id
//                   ? "border-orange-500 bg-orange-50"
//                   : "border-gray-200 hover:border-gray-300"
//               }`}
//             >
//               <span className="text-sm font-medium">{day.label}</span>
//               <span className="text-xs text-gray-500">{day.date}</span>
//             </button>
//           ))}
//         </div>

//         <h3 className="text-lg font-semibold mb-4">
//           Set Your Available Time Slot
//         </h3>
//         <p className="text-sm text-gray-500 mb-6">When you available</p>

//         <div className="flex gap-4">
//           {timeSlots.map((slot) => (
//             <button
//               key={slot.id}
//               type="button"
//               onClick={() => setSelectedSlot(slot.id)}
//               className={`px-6 py-3 rounded-lg border-2 transition-colors ${
//                 selectedSlot === slot.id
//                   ? "border-orange-500 bg-orange-50 text-orange-600"
//                   : "border-gray-200 hover:border-gray-300"
//               }`}
//             >
//               {slot.label}
//             </button>
//           ))}
//         </div>
//       </div>

//   <div className="flex justify-between">
//         <button
//           onClick={onBack}
//           className="px-8 rounded-md flex items-center gap-2 py-2 cursor-pointer text-black border border-gray-300 text-lg font-semibold"
//         >
//           Back
//         </button>
//         <button
//           onClick={handleSubmit(onSubmit)}
//           className="bg-[#E26C29] hover:bg-orange-600 px-8 rounded-md flex items-center gap-2 py-2 cursor-pointer text-white text-lg font-semibold"
//         >
//           {" "}
//           Next
//           <MoveRight />
//         </button>
//       </div>
//     </div>
//   );
// };

import { MoveRight } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";

export const ListingStep5 = ({ onSubmit, onBack, initialData }) => {
  const { control, handleSubmit, setValue, watch } = useForm({
    defaultValues: initialData || { availabilities: [] },
  });

  const [selectedDays, setSelectedDays] = useState(
    initialData?.availabilities?.map((a) => a.day) || []
  );

  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");

  const availabilities = watch("availabilities") || [];

  const days = [
    { label: "Sun", value: "Sunday" },
    { label: "Mon", value: "Monday" },
    { label: "Tue", value: "Tuesday" },
    { label: "Wed", value: "Wednesday" },
    { label: "Thu", value: "Thursday" },
    { label: "Fri", value: "Friday" },
    { label: "Sat", value: "Saturday" },
  ];

  const timeOptions = Array.from({ length: 24 }, (_, i) => {
    const hour = i % 12 === 0 ? 12 : i % 12;
    const period = i < 12 ? "AM" : "PM";
    const value = `${i.toString().padStart(2, "0")}:00`;
    return { label: `${hour}:00 ${period}`, value };
  });

  const toggleDay = (dayValue) => {
    const newDays = selectedDays.includes(dayValue)
      ? selectedDays.filter((d) => d !== dayValue)
      : [...selectedDays, dayValue];

    setSelectedDays(newDays);

    const newAvail = newDays.map((day) => ({
      day,
      start_time: startTime,
      end_time: endTime,
    }));

    setValue("availabilities", newAvail);
  };

  const updateTime = (field, value) => {
    if (field === "start") setStartTime(value);
    else setEndTime(value);

    const newAvail = selectedDays.map((day) => ({
      day,
      start_time: field === "start" ? value : startTime,
      end_time: field === "start" ? endTime : value,
    }));

    setValue("availabilities", newAvail);
  };

  const onFormSubmit = () => {
    const finalData = {
      availabilities: selectedDays.map((day) => ({
        day,
        start_time: startTime,
        end_time: endTime,
      })),
    };
    onSubmit(finalData);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-8">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-2">Set Your Available Day</h3>
        <p className="text-sm text-gray-500 mb-6">Select your availability</p>

        <div className="flex flex-wrap gap-3 justify-center">
          {days.map((day) => (
            <button
              key={day.value}
              type="button"
              onClick={() => toggleDay(day.value)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                selectedDays.includes(day.value)
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {day.label}
            </button>
          ))}
        </div>
      </div>

      {/* === Time Slot === */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-2">
          Set Your Available Time Slot
        </h3>
        <p className="text-sm text-gray-500 mb-6">Select your availability</p>

        <div className="flex items-center gap-6 max-w-md mx-auto">
          {/* Start Time */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start
            </label>
            <select
              value={startTime}
              onChange={(e) => updateTime("start", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              {timeOptions.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          <div className="self-end pb-2 text-gray-500">—</div>

          {/* End Time */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End
            </label>
            <select
              value={endTime}
              onChange={(e) => updateTime("end", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
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

      {/* === Navigation === */}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="px-8 py-2 rounded-md flex items-center gap-2 text-black border border-gray-300 text-lg font-semibold hover:bg-gray-50"
        >
          Back
        </button>

        <button
          type="submit"
          className="bg-[#E26C29] hover:bg-orange-600 px-8 py-2 rounded-md flex items-center gap-2 text-white text-lg font-semibold"
        >
          Submit Application
          <MoveRight className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
};
