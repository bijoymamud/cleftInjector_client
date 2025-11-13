import { Button } from "@/components/ui/button";
import { CiSearch } from "react-icons/ci";
import { GoSearch } from "react-icons/go";
import { LuUsers } from "react-icons/lu";
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
          <div className="absolute inset-0 bg-black/65" />

          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4 sm:px-6 md:px-8">
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4 tracking-wide">
              Find A Certified Cleft Lip Injector
            </h1>
            <p className="text-base sm:text-lg md:text-xl max-w-xl sm:max-w-2xl mb-6">
              This feature allows patients and families to easily search for
              qualified and trained cleft lip injectors near them.
            </p>
            <div className="flex md:flex-row gap-2 sm:space-x-4">
              <Button
                variant="ghost"
                onClick={handleScroll}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap md:h-12 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-primary/90 bg-gradient-to-r hover:cursor-pointer from-[#cf5a16] to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 md:text-lg text-base hover:text-white md:!px-7 !py-5"
              >
                <GoSearch className="sm:h-5 md:!h-5 md:!w-5" />
                Find Injector
              </Button>

              <Link to="/get-listed">
                <Button className="inline-flex items-center justify-center gap-2 whitespace-nowrap  md:h-12 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-primary/90 bg-gradient-to-r hover:cursor-pointer from-[#cf5a16] to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 md:text-lg text-base !px-5 md:!px-7 !py-5">
                  <LuUsers className="sm:h-5 md:!h-5 md:!w-5" />
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
