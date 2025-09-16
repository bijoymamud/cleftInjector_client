import { Button } from "@/components/ui/button";
import { CiSearch } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa6";

const Banner = () => {
  return (
    <section className="relative flex items-center justify-center h-[calc(90vh-00px)] w-full ">
      {/* White card */}
      <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden w-full container">
        {/* Image background */}
        <div className="relative h-[70vh] w-full bg-center bg-cover bg-[url('https://i.ibb.co/7xKZw4pS/banner.png')] rounded-2xl">
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/60" />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-wide">
              Find A Certified Cleft Lip Injector
            </h1>
            <p className="text-lg md:text-xl max-w-2xl  mb-6 ">
              This feature allows patients and families to easily search for
              qualified and trained cleft lip injectors near them.
            </p>
            <div className="space-x-4">
              <Button
                variant="ghost"
                className="border cursor-pointer text-md font-[550] w-[200px] bg-none border-white hover:bg-white hover:text-black py-6 rounded-[12px] "
              >
                <CiSearch size={40} />
                Find Injector
              </Button>

              <Button className="border cursor-pointer text-md font-[550] w-[200px] border-white bg-[#E26C29] hover:bg-[#d35913]  py-6 rounded-[12px] ">
                <FaRegUser size={20} />
                Get Listed
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
