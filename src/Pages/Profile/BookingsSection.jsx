import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Calendar } from "lucide-react";

const BookingsSection = ({ bookings }) => {
  return (
    <div className="space-y-6">
      {bookings.map((booking) => (
        <Card key={booking.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                  <img
                    src={booking.doctor.image}
                    alt={booking.doctor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-lg">
                      {booking.doctor.name}
                    </h3>
                    {booking.doctor.verified && (
                      <span className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded">
                        Verified
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <Calendar className="w-4 h-4" />
                    {booking.date}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {booking.description}
                  </p>
                </div>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Appointment Summary</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-600">
                          Doctor
                        </Label>
                        <p className="text-sm font-medium">
                          {booking.appointment.doctor}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-600">
                          Patient
                        </Label>
                        <p className="text-sm font-medium">
                          {booking.appointment.patient}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-600">
                          Date & Time
                        </Label>
                        <p className="text-sm whitespace-pre-line">
                          {booking.appointment.dateTime}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-600">
                          Consultation Fee
                        </Label>
                        <p className="text-sm font-semibold text-orange-600">
                          {booking.appointment.consultationFee}
                        </p>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-600">
                        Reason For Visit
                      </Label>
                      <p className="text-sm mt-1 leading-relaxed">
                        {booking.appointment.reasonForVisit}
                      </p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      ))}

      <div className="flex justify-center pt-8">
        <Button
          variant="outline"
          className="text-red-500 border-red-500 hover:bg-red-50"
        >
          Log Out
        </Button>
      </div>
    </div>
  );
};

export default BookingsSection;
