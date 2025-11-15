import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQAccordion = () => {
  const [openItem, setOpenItem] = useState("item-1");

  const toggleItem = (itemId) => {
    setOpenItem(openItem === itemId ? null : itemId);
  };

  const faqItems = [
    {
      id: "item-1",
      question: "How do I know the injectors are qualified?",
      answer:
        "All injectors in our directory undergo a rigorous verification process. We thoroughly check their medical licenses, board certifications, specialized training credentials, and years of experience in aesthetic procedures. Each provider must demonstrate current proficiency through continuing education and maintain active certifications from recognized medical boards. We also verify their clinical experience and review any disciplinary actions to ensure only the most qualified professionals are listed.",
    },
    {
      id: "item-2",
      question: "Is there a cost to use the directory as a patient?",
      answer:
        "No, our directory is completely free for patients to use. You can search through provider profiles, read detailed information about their services, view before-and-after photos, read patient reviews, and contact providers directly without any charges or subscription fees. We believe in making quality aesthetic care accessible and transparent for everyone.",
    },
    {
      id: "item-3",
      question: "How long does the application process take for providers?",
      answer:
        "The provider application process typically takes 5-10 business days from initial submission to final approval. This timeline includes document verification, medical license validation, credential checks, background screening, and reference verification. If additional documentation is required or if there are any questions about credentials, the process may take slightly longer. We prioritize thoroughness to maintain the highest standards.",
    },
    {
      id: "item-4",
      question: "Can I book appointments directly through the platform?",
      answer:
        "Currently, direct appointment booking through our platform is not available, but we're working on this feature for future release. In the meantime, each provider's profile includes multiple contact options: phone numbers, email addresses, website links, and their preferred booking methods. Many providers use online scheduling systems that you can access directly from their profile information.",
    },
    {
      id: "item-5",
      question: "What types of aesthetic procedures are covered?",
      answer:
        "Our directory covers a comprehensive range of aesthetic procedures including injectables (Botox, dermal fillers, Sculptra), laser treatments (hair removal, skin resurfacing, tattoo removal), body contouring (CoolSculpting, radiofrequency treatments), skin treatments (chemical peels, microneedling, facials), and surgical procedures (facelifts, rhinoplasty, breast augmentation). Each provider's profile clearly lists their specific services and specialties.",
    },
    {
      id: "item-6",
      question: "How do I leave a review for a provider?",
      answer:
        "After receiving treatment from a listed provider, you can leave a review by visiting their profile page and clicking the 'Write a Review' button. You'll be asked to verify your visit through appointment details or confirmation emails. Reviews are moderated to ensure authenticity and helpfulness. We encourage honest, detailed feedback about your experience, results, and overall satisfaction to help other patients make informed decisions.",
    },
  ];

  return (
    <div className="w-11/12 sm:w-4/5 md:w-2/3 mx-auto  md:p-8 py-10 sm:py-16 md:py-20">
      <div className="mb-6 sm:mb-8 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-[48px] font-bold text-title mb-2 sm:mb-3">
          Frequently Asked Questions
        </h2>
        <p className="text-label text-base md:text-xl  w-11/12 md:w-8/12 md:mx-auto ">
          Everything you need to know about our cleft lip injectors
        </p>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {faqItems.map((item) => (
          <div
            key={item.id}
            className="border border-gray-200 rounded-lg bg-[#F9F6F6] shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full px-4 sm:px-5 md:px-6 py-4 sm:py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[#FF792C] focus:ring-inset rounded-lg"
              aria-expanded={openItem === item.id}
              aria-controls={`content-${item.id}`}
            >
              <div className="flex items-center">
                <span className="text-gray-900 text-base sm:text-lg font-medium leading-relaxed pr-3 sm:pr-4">
                  {item.question}
                </span>
              </div>
              <ChevronDown
                className={`w-4 h-4 sm:w-5 sm:h-5 text-[#FF792C] flex-shrink-0 transition-transform duration-300 ease-in-out ${
                  openItem === item.id ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              id={`content-${item.id}`}
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openItem === item.id
                  ? "max-h-[500px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-1 sm:pt-2">
                <div className="ml-4 sm:ml-12 border-l-2 border-[#FF792C]/30 pl-4 sm:pl-6">
                  <p className="text-label text-sm sm:text-base leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQAccordion;
