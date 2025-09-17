

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

export function BookingStep1({ onNext, initialData, isConfirmed }) {
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
    <Card className="w-full">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
            📅
          </div>
          <span className="text-orange-500 font-medium">
            Book a Consultation
          </span>
        </div>
        <CardTitle className="text-sm text-muted-foreground">
          Schedule your appointment with our Sarah Johnson
        </CardTitle>

        <div className="flex items-center justify-center gap-8 mt-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
              1
            </div>
            <span className="text-sm font-medium">Date & Time</span>
          </div>
          <div className="w-8 h-px bg-gray-300"></div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center text-sm font-medium">
              2
            </div>
            <span className="text-sm text-gray-500">Your Details</span>
          </div>
          <div className="w-8 h-px bg-gray-300"></div>
          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 ${
                isConfirmed
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-500"
              } rounded-full flex items-center justify-center text-sm font-medium`}
            >
              {isConfirmed ? "✓" : "3"}
            </div>
            <span
              className={`text-sm ${
                isConfirmed ? "text-green-600" : "text-gray-500"
              }`}
            >
              Confirmation
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">
            Select Your Preferred Date
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Choose from available dates
          </p>

          <div className="flex justify-center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={(date) => date < new Date()}
              className="rounded-md border"
            />
          </div>
        </div>

        {selectedDate && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Available Time Slots</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Select your preferred appointment time
            </p>

            <div className="grid grid-cols-3 gap-3">
              {timeSlots.map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? "default" : "outline"}
                  className={`h-10 ${
                    selectedTime === time
                      ? "bg-orange-500 hover:bg-orange-600 text-white"
                      : "hover:bg-orange-50 hover:border-orange-200"
                  }`}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </Button>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-between pt-4">
          <Button variant="outline" disabled>
            ← Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={!selectedDate || !selectedTime}
            className="bg-orange-500 hover:bg-orange-600"
          >
            Next →
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
