import { LayoutList } from "lucide-react";

export const ProgressBar = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-center gap-2 mb-2">
        <div className="w-10 h-10 bg-[#E26C29] text-white rounded-md flex items-center justify-center text-sm font-medium">
          <LayoutList />
        </div>
        <h2 className="text-[30px] font-bold text-title ">Get Listed</h2>
      </div>
      <p className="font-semibold text-md text-muted-foreground text-center">
        {currentStep === 6
          ? "Application Complete!"
          : "Join our network of verified cleft lip injectors"}
      </p>
      <div className="mt-4">
        <div className="text-base font-semibold text-gray-600">
          {currentStep === 6
            ? "100% Complete"
            : `Step ${currentStep} of ${totalSteps}`}
        </div>
        <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
          <div
            className="bg-orange-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};
