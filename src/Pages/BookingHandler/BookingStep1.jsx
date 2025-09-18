import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FaArrowRightLong } from "react-icons/fa6";
import { LuClock3 } from "react-icons/lu";

const timeSlots = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
];

export function BookingStep1({ onNext, initialData }) {
  const [selectedDate, setSelectedDate] = useState(
    initialData?.selectedDate || null
  );
  const [selectedTime, setSelectedTime] = useState(
    initialData?.selectedTime || null
  );

  const handleNext = () => {
    if (selectedDate && selectedTime) {
      onNext({ selectedDate, selectedTime });
    }
  };

  return (
    <Card className="w-full py-10">
      <CardContent className="space-y-6">
        <div className="p-5">
          <h3 className="text-2xl font-semibold mb-2 text-[#3D3B3B]">
            Select Your Preferred Date
          </h3>
          <p className="text-lg text-muted-foreground mb-4">
            Choose from available dates
          </p>

          <div className="flex justify-center w-md mx-auto">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={(date) => date < new Date()}
              className="rounded-lg border w-full my-6 p-10"
            />
          </div>
        </div>

        {selectedDate && (
          <div className="p-5">
            <h3 className="text-2xl font-semibold mb-2 text-[#3D3B3B]">
              Available Time Slots
            </h3>
            <p className="text-lg text-muted-foreground mb-8">
              Select your preferred appointment time
            </p>

            <div className="grid grid-cols-3 gap-3">
              {timeSlots.map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? "default" : "outline"}
                  className={`h-10 cursor-pointer ${
                    selectedTime === time
                      ? "bg-[#E26C29] hover:bg-orange-600 text-white"
                      : "hover:bg-orange-50 hover:border-orange-200"
                  }`}
                  onClick={() => setSelectedTime(time)}
                >
                  <LuClock3 size={24} />
                  <span className="text-base font-semibold">{time}</span>
                </Button>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-end pt-4">
          <button
            onClick={handleNext}
            disabled={!selectedDate || !selectedTime}
            className="bg-[#E26C29] hover:bg-orange-600 px-8 rounded-md flex items-center gap-2 py-2 cursor-pointer text-white text-lg font-semibold"
          >
            Next <FaArrowRightLong />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
