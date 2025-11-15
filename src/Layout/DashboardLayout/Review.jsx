// import React, { useState } from "react";
// import { Star } from "lucide-react";
// import { useGetReviewsQuery } from "@/redux/features/baseApi";

// export default function Review() {
//   const [activeTab, setActiveTab] = useState("all");
//   const { data: reviewData, isLoading, isError } = useGetReviewsQuery();

//   const getRatingData = () => {
//     if (!reviewData?.rating_distribution) return [];

//     const distribution = reviewData.rating_distribution;
//     const totalReviews = Object.values(distribution).reduce(
//       (sum, count) => sum + count,
//       0
//     );

//     return [5, 4, 3, 2, 1].map((stars) => {
//       const count = distribution[stars] || 0;
//       const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
//       return { stars, count, percentage };
//     });
//   };

//   const ratingData = getRatingData();
//   const feedbacks = reviewData?.feedback || [];
//   const averageRating = reviewData?.average_rating || 0;

//   if (isLoading) {
//     return (
//       <div className="mx-auto bg-white p-8">
//         <div className="text-center text-gray-500">Loading reviews...</div>
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="mx-auto bg-white p-8">
//         <div className="text-center text-red-500">Error loading reviews</div>
//       </div>
//     );
//   }

//   return (
//     <div className="mx-auto bg-white">
//       <div className="mb-8">
//         <h2 className="text-2xl font-semibold text-gray-900 mb-1">Rating</h2>
//         <p className="text-gray-500 mb-6 text-base">
//           Your current overall rating based on client feedback.
//         </p>

//         <div className="flex gap-32 items-center">
//           <div className="basis-6/12 space-y-3">
//             {ratingData.map((item) => (
//               <div key={item.stars} className="flex items-center gap-3">
//                 <div className="flex items-center gap-1 w-8">
//                   <span className="text-lg font-semibold">{item.stars}</span>
//                   <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
//                 </div>
//                 <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
//                   <div
//                     className="h-full bg-orange-500 rounded-full transition-all duration-300"
//                     style={{ width: `${item.percentage}%` }}
//                   />
//                 </div>
//                 <span className="text-sm font-medium w-8 text-right">
//                   {item.count}
//                 </span>
//               </div>
//             ))}
//           </div>
//           <div className="border border-gray-200 h-[150px]"></div>
//           <div className="flex flex-col basis-6/12 items-start">
//             <div className="flex items-center gap-2">
//               <span className="text-5xl font-bold">
//                 {averageRating.toFixed(1)}
//               </span>
//               <Star className="w-10 h-10 fill-yellow-400 text-yellow-400" />
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="py-10">
//         <h2 className="text-xl font-semibold mb-2">Feed Back</h2>
//         <p className="text-sm text-gray-500 mb-6">
//           Your current overall rating based on client feedback.
//         </p>

//         <div className="flex gap-2 mb-6">
//           <button
//             onClick={() => setActiveTab("all")}
//             className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
//               activeTab === "all"
//                 ? "bg-orange-500 text-white"
//                 : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//             }`}
//           >
//             All
//           </button>
//           <button
//             onClick={() => setActiveTab("new")}
//             className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
//               activeTab === "new"
//                 ? "bg-orange-500 text-white"
//                 : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//             }`}
//           >
//             New
//           </button>
//           <button
//             onClick={() => setActiveTab("previous")}
//             className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
//               activeTab === "previous"
//                 ? "bg-orange-500 text-white"
//                 : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//             }`}
//           >
//             Previous
//           </button>
//         </div>

//         {feedbacks.length === 0 ? (
//           <div className="text-center text-gray-500 py-10">
//             No feedback available yet.
//           </div>
//         ) : (
//           <div className="mt-14 space-y-10">
//             {feedbacks?.map((feedback) => (
//               <div
//                 key={feedback.id}
//                 className="bg-white cursor-pointer rounded-lg shadow-md p-4 transition-shadow"
//               >
//                 <div className="flex items-start gap-4">
//                   <img
//                     src={
//                       feedback.reviewer_image ||
//                       "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
//                     }
//                     alt={feedback.reviewer_name}
//                     className="w-12 h-12 rounded-full object-cover"
//                     onError={(e) => {
//                       e.target.src =
//                         "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop";
//                     }}
//                   />
//                   <div className="flex-1">
//                     <h3 className="font-semibold text-gray-900">
//                       {feedback.reviewer_name}
//                     </h3>
//                     <p className="text-sm text-gray-500 mb-2">
//                       {feedback.reviewer_role || "Client"}
//                     </p>
//                     <div className="flex gap-1 mb-3">
//                       {[...Array(5)].map((_, i) => (
//                         <Star
//                           key={i}
//                           className={`w-4 h-4 ${
//                             i < feedback.rating
//                               ? "fill-yellow-400 text-yellow-400"
//                               : "fill-gray-200 text-gray-200"
//                           }`}
//                         />
//                       ))}
//                     </div>
//                     <p className="text-sm text-gray-600 leading-relaxed">
//                       {feedback.comment}
//                     </p>
//                     {feedback.created_at && (
//                       <p className="text-xs text-gray-400 mt-2">
//                         {new Date(feedback.created_at).toLocaleDateString()}
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { Star } from "lucide-react";
import { useGetReviewsQuery } from "@/redux/features/baseApi";

export default function Review() {
  const [activeTab, setActiveTab] = useState("all");
  const { data: reviewData, isLoading, isError } = useGetReviewsQuery();

  const getRatingData = () => {
    if (!reviewData?.rating_distribution) return [];

    const distribution = reviewData.rating_distribution;
    const totalReviews = Object.values(distribution).reduce(
      (sum, count) => sum + count,
      0
    );

    return [5, 4, 3, 2, 1].map((stars) => {
      const count = distribution[stars] || 0;
      const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
      return { stars, count, percentage };
    });
  };

  const ratingData = getRatingData();
  const feedbacks = reviewData?.feedback || [];
  const averageRating = reviewData?.average_rating || 0;

  if (isLoading) {
    return (
      <div className="mx-auto bg-white p-4 sm:p-8">
        <div className="text-center text-gray-500">Loading reviews...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto bg-white p-4 sm:p-8">
        <div className="text-center text-red-500">Error loading reviews</div>
      </div>
    );
  }

  return (
    <div className="mx-auto bg-white ">
      <div className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-1">
          Rating
        </h2>
        <p className="text-sm sm:text-base text-gray-500 mb-4 sm:mb-6">
          Your current overall rating based on client feedback.
        </p>

        {/* Mobile: Stack vertically, Desktop: Flex row */}
        <div className="flex flex-col sm:flex-row sm:gap-32 sm:items-center">
          {/* Rating Bars */}
          <div className="w-full sm:basis-6/12 space-y-2 sm:space-y-3 mb-6 sm:mb-0">
            {ratingData.map((item) => (
              <div
                key={item.stars}
                className="flex items-center gap-2 sm:gap-3"
              >
                <div className="flex items-center gap-1 w-8">
                  <span className="text-base sm:text-lg font-semibold">
                    {item.stars}
                  </span>
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                </div>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-orange-500 rounded-full transition-all duration-300"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <span className="text-xs sm:text-sm font-medium w-8 text-right">
                  {item.count}
                </span>
              </div>
            ))}
          </div>

          {/* Divider - Hidden on mobile */}
          <div className="hidden sm:block border border-gray-200 h-[150px] mx-8"></div>

          {/* Average Rating */}
          <div className="flex flex-col items-center sm:items-start sm:basis-6/12">
            <div className="flex items-center gap-2">
              <span className="text-4xl sm:text-5xl font-bold">
                {averageRating.toFixed(1)}
              </span>
              <Star className="w-8 h-8 sm:w-10 sm:h-10 fill-yellow-400 text-yellow-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="py-6 sm:py-10">
        <h2 className="text-lg sm:text-xl font-semibold mb-2">Feed Back</h2>
        <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">
          Your current overall rating based on client feedback.
        </p>

        {/* Tabs - Stack on mobile */}
        <div className="flex flex-wrap gap-2 mb-6">
          {["all", "new", "previous"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {feedbacks.length === 0 ? (
          <div className="text-center text-gray-500 py-8 sm:py-10 text-sm">
            No feedback available yet.
          </div>
        ) : (
          <div className="space-y-6 sm:space-y-10">
            {feedbacks?.map((feedback) => (
              <div
                key={feedback.id}
                className="bg-white rounded-lg shadow-md p-4 transition-shadow"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <img
                    src={
                      feedback.reviewer_image ||
                      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
                    }
                    alt={feedback.reviewer_name}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0"
                    onError={(e) => {
                      e.target.src =
                        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop";
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                      {feedback.reviewer_name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">
                      {feedback.reviewer_role || "Client"}
                    </p>
                    <div className="flex gap-1 mb-2 sm:mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 sm:w-4 sm:h-4 ${
                            i < feedback.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "fill-gray-200 text-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {feedback.comment}
                    </p>
                    {feedback.created_at && (
                      <p className="text-xs text-gray-400 mt-2">
                        {new Date(feedback.created_at).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
