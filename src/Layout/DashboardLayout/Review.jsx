import React, { useState } from "react";
import { Star } from "lucide-react";

export default function Review() {
  const [activeTab, setActiveTab] = useState("all");

  const ratingData = [
    { stars: 5, count: 77, percentage: 75 },
    { stars: 4, count: 60, percentage: 58 },
    { stars: 3, count: 55, percentage: 53 },
    { stars: 2, count: 20, percentage: 19 },
    { stars: 1, count: 4, percentage: 4 },
  ];

  const feedbacks = [
    {
      id: 1,
      name: "Saint Thomas",
      role: "Web Developer",
      rating: 5,
      text: "Lorem ipsum dolor sit amet consectetur. Sagittis ornare vitae pellentesque amet est massa. Pharetra interdum non eget amet nisl non. Morbis posuere integer mollis aliquam fermentum odio vitae. Sociis porta commodo pellentesque maecenas habitant. Sit amet nisl fermentum",
    },
    {
      id: 2,
      name: "Saint Thomas",
      role: "Web Developer",
      rating: 5,
      text: "Lorem ipsum dolor sit amet consectetur. Sagittis ornare vitae pellentesque amet est massa. Pharetra interdum non eget amet nisl non. Morbis posuere integer mollis aliquam fermentum odio vitae. Sociis porta commodo pellentesque maecenas habitant. Sit amet nisl fermentum",
    },
    {
      id: 3,
      name: "Saint Thomas",
      role: "Web Developer",
      rating: 5,
      text: "Lorem ipsum dolor sit amet consectetur. Sagittis ornare vitae pellentesque amet est massa. Pharetra interdum non eget amet nisl non. Morbis posuere integer mollis aliquam fermentum odio vitae. Sociis porta commodo pellentesque maecenas habitant. Sit amet nisl fermentum",
    },
  ];

  return (
    <div className="mx-auto bg-white">
      {/* Rating Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-1">Rating</h2>
        <p className=" text-gray-500 mb-6 text-base">
          Your current overall rating based on client feedback.
        </p>

        <div className="flex gap-32 items-center">
          {/* Rating Bars */}
          <div className="basis-6/12 space-y-3">
            {ratingData.map((item) => (
              <div key={item.stars} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-8">
                  <span className="text-lg font-semibold">{item.stars}</span>
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                </div>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-orange-500 rounded-full transition-all duration-300"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <span className="text-sm font-medium w-8 text-right">
                  {item.count}
                </span>
              </div>
            ))}
          </div>
          <div className="border border-gray-200 h-[150px]"></div>
          {/* Overall Rating */}
          <div className="flex flex-col basis-6/12 items-start">
            <div className="flex items-center gap-2">
              <span className="text-5xl font-bold">4.5</span>
              <Star className="w-10 h-10 fill-yellow-400 text-yellow-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Section */}
      <div className="py-10">
        <h2 className="text-xl font-semibold mb-2">Feed Back</h2>
        <p className="text-sm text-gray-500 mb-6">
          Your current overall rating based on client feedback.
        </p>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "all"
                ? "bg-orange-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveTab("new")}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "new"
                ? "bg-orange-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            New
          </button>
          <button
            onClick={() => setActiveTab("previous")}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "previous"
                ? "bg-orange-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Previous
          </button>
        </div>

        {/* Feedback List */}
        <div className="mt-14 space-y-10">
          {feedbacks.map((feedback) => (
            <div
              key={feedback.id}
              className="bg-white cursor-pointer rounded-lg shadow-md p-4  transition-shadow"
            >
              <div className="flex items-start gap-4">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
                  alt={feedback.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">
                    {feedback.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">{feedback.role}</p>
                  <div className="flex gap-1 mb-3">
                    {[...Array(feedback.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {feedback.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
