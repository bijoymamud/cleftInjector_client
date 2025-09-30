// import { Button } from "@/components/ui/button";
// import { CiSearch } from "react-icons/ci";
// import { FaRegUser } from "react-icons/fa6";
// import { Link } from "react-router";

// const Banner = () => {
//   const handleScroll = () => {
//     const section = document.getElementById("search_injectors");
//     if (section) {
//       section.scrollIntoView({
//         behavior: "smooth",
//         block: "center",
//       });
//     }
//   };

//   return (
//     <section className="relative flex items-center justify-center h-[calc(90vh-00px)] w-full ">
//       <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden w-full container">
//         <div className="relative md:h-[70vh] md:w-full bg-center bg-cover bg-[url('https://i.ibb.co/7xKZw4pS/banner.png')] rounded-2xl">
//           <div className="absolute inset-0 bg-black/60" />

//           <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white md:px-6 ">
//             <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-wide">
//               Find A Certified Cleft Lip Injector
//             </h1>
//             <p className="text-lg md:text-xl max-w-2xl  mb-6">
//               This feature allows patients and families to easily search for
//               qualified and trained cleft lip injectors near them.
//             </p>
//             <div className="space-x-4">
//               <Button
//                 variant="ghost"
//                 onClick={handleScroll}
//                 className="border cursor-pointer text-md font-[550] w-[200px] bg-none border-white hover:bg-white hover:text-black py-6 rounded-[12px] "
//               >
//                 <CiSearch size={40} />
//                 Find Injector
//               </Button>

//               <Link to="/get-listed">
//                 <Button className="border cursor-pointer text-md font-[550] w-[200px] border-white bg-[#E26C29] hover:bg-[#d35913] py-6 rounded-[12px] ">
//                   <FaRegUser size={20} />
//                   Get Listed
//                 </Button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Banner;

import { Button } from "@/components/ui/button";
import { CiSearch } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa6";
import { Link } from "react-router";

const Banner = () => {
  const handleScroll = () => {
    const section = document.getElementById("search_injectors");
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return (
    <section className="relative flex items-center justify-center md:h-[calc(100vh-80px)] w-full md:px-4 ">
      <div className="relative bg-white md:rounded-2xl shadow-lg overflow-hidden w-full container">
        <div className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] w-full bg-center bg-cover bg-[url('https://i.ibb.co/7xKZw4pS/banner.png')] rounded-2xl">
          <div className="absolute inset-0 bg-black/60" />

          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4 sm:px-6 md:px-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-4 tracking-wide">
              Find A Certified Cleft Lip Injector
            </h1>
            <p className="text-base sm:text-lg md:text-xl max-w-xl sm:max-w-2xl mb-6">
              This feature allows patients and families to easily search for
              qualified and trained cleft lip injectors near them.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:space-x-4">
              <Button
                variant="ghost"
                onClick={handleScroll}
                className="border cursor-pointer text-lg sm:text-md font-[550] w-full sm:w-[180px] md:w-[200px] bg-none border-white hover:bg-white hover:text-black py-4 sm:py-5 md:py-6 rounded-[12px] flex items-center justify-center gap-2"
              >
                <CiSearch size={30} className="sm:h-8 md:h-10" />
                Find Injector
              </Button>

              <Link to="/get-listed">
                <Button className="border cursor-pointer text-lg sm:text-md font-[550] w-full sm:w-[180px] md:w-[200px] border-white bg-[#E26C29] hover:bg-[#d35913] py-4 sm:py-5 md:py-6 rounded-[12px] flex items-center justify-center gap-2">
                  <FaRegUser size={18} className="sm:h-5 md:h-6" />
                  Get Listed
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
