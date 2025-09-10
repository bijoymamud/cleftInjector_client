const DirectoryCallToAction = () => {
  return (
    <div className="bg-[#101828] p-10">
      <p className="text-tagline pt-10 text-center">For Provider</p>
      <h1 className="text-white  text-center text-[48px] font-bold pt-2">
        Get Listed In Our Directory
      </h1>
      <p className="text-white text-center py-3">
        Join our network of certified cleft lip injectors and connect with
        patients seeking your expertise.
      </p>

      <div className="space-x-4 py-3 flex items-center justify-center">
        <button className="border cursor-pointer px-10 bg-[#E26C29]  hover:bg-[#cf5a16]hover:text-black text-white border-none py-3 rounded-[12px] font-medium">
          Learn More
        </button>
        <button className="border border-white text-white cursor-pointer px-10 py-3 rounded-[12px]">
          Get Started
        </button>
      </div>
      <div className="border border-t border-gray-500 mt-20 container mx-auto"></div>
    </div>
  );
};

export default DirectoryCallToAction;
