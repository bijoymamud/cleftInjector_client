import { useState, useCallback } from "react";

const testimonials = [
  {
    id: 1,
    name: "Saint Thomas",
    role: "Web Developer",
    image: "/professional-headshot-of-saint-thomas.jpg",
    rating: 5,
    text: "Lorem ipsum dolor sit amet consectetur. Sagittis ornare vitae pellentesque amet est massa. Pharetra interdum non eget amet nisl non. Sociis porta commodo pellentesque maecenas habitant. Sit amet nisl fermentum.",
  },
  {
    id: 2,
    name: "Saint Thomas",
    role: "Web Developer",
    image: "/professional-headshot-of-saint-thomas.jpg",
    rating: 5,
    text: "Lorem ipsum dolor sit amet consectetur. Sagittis ornare vitae pellentesque amet est massa. Pharetra interdum non eget amet nisl non. Sociis porta commodo pellentesque maecenas habitant. Sit amet nisl fermentum.",
  },
  {
    id: 3,
    name: "Pappu",
    role: "Web Developer",
    image: "/professional-headshot-of-pappu.jpg",
    rating: 5,
    text: "Lorem ipsum dolor sit amet consectetur. Sagittis ornare vitae pellentesque amet est massa. Pharetra interdum non eget amet nisl non. Sociis porta commodo pellentesque maecenas habitant. Sit amet nisl fermentum.",
  },
  {
    id: 4,
    name: "Kamil Thomas",
    role: "Web Developer",
    image: "/professional-headshot-of-kamil-thomas.jpg",
    rating: 5,
    text: "Lorem ipsum dolor sit amet consectetur. Sagittis ornare vitae pellentesque amet est massa. Pharetra interdum non eget amet amet nisl non. Sociis porta commodo pellentesque maecenas habitant. Sit amet nisl fermentum.",
  },
];

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
  const testimonialsPerPage = 2;

  const nextTestimonial = useCallback(() => {
    setCurrentIndex(
      (prev) => (prev + testimonialsPerPage) % testimonials.length
    );
  }, []);

  const prevTestimonial = useCallback(() => {
    setCurrentIndex(
      (prev) =>
        (prev - testimonialsPerPage + testimonials.length) % testimonials.length
    );
  }, []);

  const isFirstPage = currentIndex === 0;
  const isLastPage = currentIndex + testimonialsPerPage >= testimonials.length;

  return (
    <section className=" bg-white">
      <div className="container mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <p className="text-tagline text-[24px]">Testimonials</p>
            <h2 className="text-[48px] font-bold text-title ">
              What Our Member Says
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={prevTestimonial}
              className={`w-8 h-8 rounded-full bg-orange-100 hover:bg-orange-200 flex items-center justify-center ${
                isFirstPage ? "opacity-50 cursor-not-allowed" : ""
              }`}
              aria-label="Previous testimonials"
              disabled={isFirstPage}
            >
              <svg
                className="w-4 h-4 text-orange-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={nextTestimonial}
              className={`w-8 h-8 rounded-full bg-orange-500 hover:bg-orange-600 flex items-center justify-center ${
                isLastPage ? "opacity-50 cursor-not-allowed" : ""
              }`}
              aria-label="Next testimonials"
              disabled={isLastPage}
            >
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${
                (currentIndex / testimonialsPerPage) * 100
              }%)`,
            }}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="flex-shrink-0 w-1/3  px-2 py-5"
              >
                <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {testimonial.name}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>

                  <StarRating rating={testimonial.rating} />

                  <p className="text-gray-600 text-sm leading-relaxed">
                    {testimonial.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
