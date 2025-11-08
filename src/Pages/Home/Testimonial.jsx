

import { useGetReviewQuery } from "@/redux/features/noAuthApi";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useCallback } from "react";

const StarRating = ({ rating }) => {
  return (
    <div className="flex gap-1 mb-2">
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          className={`w-4 h-4 ${
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
    setCurrentIndex(
      (prev) => (prev + testimonialsPerPage) % testimonials.length
    );
  }, [testimonials.length]);

  const prevTestimonial = useCallback(() => {
    setCurrentIndex(
      (prev) =>
        (prev - testimonialsPerPage + testimonials.length) % testimonials.length
    );
  }, [testimonials.length]);

  const isFirstPage = currentIndex === 0;
  const isLastPage = currentIndex + testimonialsPerPage >= testimonials.length;

  if (!testimonials.length) {
    return (
      <section className="bg-white py-12 text-center text-gray-500">
        <p>No testimonials available.</p>
      </section>
    );
  }

  return (
    <section className="bg-white py-8 sm:py-12">
      <div className="container mx-auto">
        <div className="mb-6 sm:mb-8 flex justify-between items-center">
          <div>
            <p className="text-tagline text-lg sm:text-[24px]">Testimonials</p>
            <h2 className="text-2xl sm:text-3xl md:text-[48px] font-bold text-title">
              What Our Members Say
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={prevTestimonial}
              className={`w-8 h-8 rounded-full bg-orange-100 hover:bg-orange-200 flex items-center justify-center ${
                isFirstPage ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isFirstPage}
            >
              <ChevronLeft size={18} className="text-orange-600" />
            </button>
            <button
              onClick={nextTestimonial}
              className={`w-8 h-8 rounded-full bg-orange-500 hover:bg-orange-600 flex items-center justify-center ${
                isLastPage ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLastPage}
            >
              <ChevronRight size={18} className="text-white" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {testimonials
            .slice(currentIndex, currentIndex + testimonialsPerPage)
            .map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-gray-50 p-6 rounded-lg shadow-md"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.reviewer_image || "/placeholder.svg"}
                    alt={testimonial.reviewer_name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {testimonial.reviewer_name}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      {new Date(testimonial.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <StarRating rating={testimonial.rating} />

                <p className="text-gray-700 leading-relaxed">
                  {testimonial.comment}
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
