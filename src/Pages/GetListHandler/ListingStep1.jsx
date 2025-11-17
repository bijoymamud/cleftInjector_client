
import { MoveRight, Upload, MapPin } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

export const ListingStep1 = ({ onSubmit, initialData }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: initialData || {},
  });

  const [profileImage, setProfileImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [showLocationPopup, setShowLocationPopup] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);

  useEffect(() => {
    if (initialData?.profile_image) {
      if (initialData.profile_image instanceof File) {
        setProfileImage(initialData.profile_image);
        const previewUrl = URL.createObjectURL(initialData.profile_image);
        setPreview(previewUrl);

        return () => URL.revokeObjectURL(previewUrl);
      }
    }
  }, [initialData?.profile_image]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (preview) {
        URL.revokeObjectURL(preview);
      }

      setProfileImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleLocationCheckbox = (e) => {
    const isChecked = e.target.checked;
    setUseCurrentLocation(isChecked);

    if (isChecked) {
      getCurrentLocation();
    } else {
      setValue("latitude", "");
      setValue("longitude", "");
    }
  };

  const getCurrentLocation = () => {
    setLoadingLocation(true);
    setShowLocationPopup(true);

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          setValue("latitude", latitude);
          setValue("longitude", longitude);

          console.log("Location captured:", { latitude, longitude });

          fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          )
            .then((res) => res.json())
            .then((data) => {
              const address = data.address;

              console.log("Address data:", address);

              if (address.country) {
                setValue("country", address.country, { shouldValidate: true });
              }
              if (address.city || address.town || address.village) {
                setValue(
                  "city",
                  address.city || address.town || address.village,
                  { shouldValidate: true }
                );
              }

              setLoadingLocation(false);
              setTimeout(() => {
                setShowLocationPopup(false);
              }, 1500);
            })
            .catch((error) => {
              console.error("Error getting address:", error);
              setLoadingLocation(false);
              setTimeout(() => {
                setShowLocationPopup(false);
              }, 1000);
              alert("Location detected but could not get address details");
            });
        },
        (error) => {
          console.error("Geolocation error:", error);
          setLoadingLocation(false);
          setShowLocationPopup(false);
          setUseCurrentLocation(false);

          if (error.code === error.PERMISSION_DENIED) {
            alert(
              "Location access denied. Please enable location permission in your browser settings."
            );
          } else if (error.code === error.POSITION_UNAVAILABLE) {
            alert("Location information unavailable. Please try again.");
          } else if (error.code === error.TIMEOUT) {
            alert("Location request timed out. Please try again.");
          } else {
            alert("Could not access your location. Please enter manually.");
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      setLoadingLocation(false);
      setShowLocationPopup(false);
      setUseCurrentLocation(false);
      alert("Geolocation is not supported by your browser");
    }
  };

  const onFormSubmit = (data) => {
    onSubmit({
      ...data,
      ...(profileImage && { profile_image: profileImage }),
    });
  };

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <div className="">
      {showLocationPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50 w-full min-h-full backdrop-blur-[1px]"></div>

          <div className="relative bg-white rounded-lg shadow-xl p-6 sm:p-8 max-w-md w-full mx-4 z-60">
            <div className="flex flex-col items-center text-center">
              <div className="bg-orange-100 p-3 sm:p-4 rounded-full mb-3 sm:mb-4">
                <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500" />
              </div>

              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                {loadingLocation
                  ? "Getting Your Location..."
                  : "Location Detected!"}
              </h3>

              <p className="text-sm sm:text-base text-gray-600 mb-4">
                {loadingLocation
                  ? "Please wait while we detect your location"
                  : "Your location has been successfully detected"}
              </p>

              {loadingLocation && (
                <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1 sm:mb-2">
          Basic Information
        </h3>
        <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">
          Fill required information
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-base sm:text-lg font-semibold mb-2">
              Designation Name <span className="text-red-500">*</span>
            </label>
            <input
              {...register("designation", { required: "Required" })}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-orange-500"
              placeholder="Enter Name"
            />
            {errors.designation && (
              <p className="text-red-500 text-xs mt-1">
                {errors.designation.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-base sm:text-lg font-semibold mb-2">
              Clinic Name <span className="text-red-500">*</span>
            </label>
            <input
              {...register("clinic_name", { required: "Required" })}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-orange-500"
              placeholder="Clinic Name"
            />
            {errors.clinic_name && (
              <p className="text-red-500 text-xs mt-1">
                {errors.clinic_name.message}
              </p>
            )}
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center gap-2 mb-4">
            <input
              type="checkbox"
              id="use-current-location"
              checked={useCurrentLocation}
              onChange={handleLocationCheckbox}
              className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
            />
            <label
              htmlFor="use-current-location"
              className="text-xs sm:text-sm font-medium text-gray-700 cursor-pointer"
            >
              Use my current Location instead
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-base sm:text-lg font-semibold mb-2">
              Country <span className="text-red-500">*</span>
            </label>
            <input
              {...register("country", { required: "Required" })}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-orange-500"
              placeholder="Country"
            />
            {errors.country && (
              <p className="text-red-500 text-xs mt-1">
                {errors.country.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-base sm:text-lg font-semibold mb-2">
              City <span className="text-red-500">*</span>
            </label>
            <input
              {...register("city", { required: "Required" })}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-orange-500"
              placeholder="City"
            />
            {errors.city && (
              <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>
            )}
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-base sm:text-lg font-semibold mb-2">
            About Yourself <span className="text-red-500">*</span>
          </label>
          <textarea
            {...register("about", { required: "Required" })}
            rows={5}
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-orange-500"
            placeholder="Tell us about yourself"
          />
          {errors.about && (
            <p className="text-red-500 text-xs mt-1">{errors.about.message}</p>
          )}
        </div>

        <div className="mt-6">
          <label className="block text-base sm:text-lg font-semibold mb-2">
            Profile Picture
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="profile-image"
          />
          <label
            htmlFor="profile-image"
            className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 cursor-pointer flex flex-col items-center hover:border-orange-300 transition-colors"
          >
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-full mb-2"
              />
            ) : (
              <Upload className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400 mb-2" />
            )}
            <p className="text-xs sm:text-sm text-gray-500 text-center">
              {profileImage
                ? profileImage.name
                : "Drag & drop or click to upload"}
            </p>
          </label>
        </div>
      </div>

      <div className="flex justify-end mt-4 sm:mt-6">
        <button
          onClick={handleSubmit(onFormSubmit)}
          className="bg-[#E26C29] hover:bg-orange-600 px-6 sm:px-8 py-2 rounded-md flex items-center gap-2 text-white text-base sm:text-lg font-semibold transition-colors w-full sm:w-auto justify-center"
        >
          Next <MoveRight />
        </button>
      </div>
    </div>
  );
};

// Demo wrapper
export default function App() {
  const handleSubmit = (data) => {
    console.log("Form submitted:", data);
    alert("Form submitted! Check console for data.");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8">
          Create Listing
        </h1>
        <ListingStep1 onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
