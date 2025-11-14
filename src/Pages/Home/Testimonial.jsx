import { useGetReviewQuery } from "@/redux/features/noAuthApi";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useState, useCallback } from "react";
import { FaQuoteLeft } from "react-icons/fa";

const StarRating = ({ rating }) => {
  return (
    <div className="flex gap-1 mb-2">
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          className={`w-5 h-5 ${
            index < rating ? "text-yellow-400" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data: testimonials = [] } = useGetReviewQuery();

  const testimonialsPerPage = 3;

  const nextTestimonial = useCallback(() => {
    if (currentIndex + testimonialsPerPage < testimonials.length) {
      setCurrentIndex((prev) => prev + testimonialsPerPage);
    }
  }, [testimonials.length, currentIndex]);

  const prevTestimonial = useCallback(() => {
    if (currentIndex - testimonialsPerPage >= 0) {
      setCurrentIndex((prev) => prev - testimonialsPerPage);
    }
  }, [currentIndex]);

  const isFirstPage = currentIndex === 0;
  const isLastPage = currentIndex + testimonialsPerPage >= testimonials.length;

  if (!testimonials.length) {
    return (
      <section className="bg-gradient-to-br from-orange-50 via-white to-blue-50 py-16 text-center">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No Testimonials Yet
            </h3>
            <p className="text-gray-600">
              Be the first to share your experience!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-br from-orange-50 via-white to-blue-50 py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 sm:mb-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <p className="text-tagline text-lg sm:text-[24px]">Testimonials</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
              What Our Members Say
            </h2>
            <p className="text-gray-600 mt-2">
              Real experiences from our valued patients
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={prevTestimonial}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${
                isFirstPage
                  ? "bg-gray-200 cursor-not-allowed opacity-50"
                  : "bg-white hover:bg-orange-500 hover:scale-110 group"
              }`}
              disabled={isFirstPage}
              aria-label="Previous testimonials"
            >
              <ChevronLeft
                size={24}
                className={`${
                  isFirstPage
                    ? "text-gray-400"
                    : "text-orange-600 group-hover:text-white"
                } transition-colors`}
              />
            </button>
            <button
              onClick={nextTestimonial}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${
                isLastPage
                  ? "bg-gray-200 cursor-not-allowed opacity-50"
                  : "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 hover:scale-110"
              }`}
              disabled={isLastPage}
              aria-label="Next testimonials"
            >
              <ChevronRight
                size={24}
                className={`${isLastPage ? "text-gray-400" : "text-white"}`}
              />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials
            .slice(currentIndex, currentIndex + testimonialsPerPage)
            .map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="bg-white p-6 rounded-2xl shadow-md hover:cursor-pointer  transition-all duration-300 border border-gray-100 "
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Quote Icon */}
                <div className="flex justify-end mb-4">
                  <FaQuoteLeft
                    size={32}
                    className="opacity-50 text-[#FF792C]"
                  />
                </div>

                {/* Reviewer Info */}
                <div className="flex items-center mb-4">
                  <div className="relative">
                    <img
                      src={testimonial.reviewer_image || "/placeholder.svg"}
                      alt={testimonial.reviewer_name}
                      className="w-14 h-14 rounded-full object-cover ring-4 ring-orange-100"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold text-gray-900 text-lg">
                      {testimonial.reviewer_name}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      {new Date(testimonial.created_at).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </p>
                  </div>
                </div>

                {/* Rating */}
                <StarRating rating={testimonial.rating} />

                {/* Comment */}
                <p className="text-gray-700 leading-relaxed text-sm mt-4">
                  {testimonial.comment}
                </p>
              </div>
            ))}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {Array.from({
            length: Math.ceil(testimonials.length / testimonialsPerPage),
          }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index * testimonialsPerPage)}
              className={`h-2 rounded-full transition-all duration-300 ${
                Math.floor(currentIndex / testimonialsPerPage) === index
                  ? "w-8 bg-orange-500"
                  : "w-2 bg-gray-300 hover:bg-orange-300"
              }`}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
