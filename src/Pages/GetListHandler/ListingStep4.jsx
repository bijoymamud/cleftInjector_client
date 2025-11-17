
import { MoveRight, Upload, Trash2, Plus } from "lucide-react";
import { useForm, useFieldArray } from "react-hook-form";
import { useState, useEffect } from "react";

export const ListingStep4 = ({ onSubmit, onBack, initialData }) => {
  const { register, handleSubmit, control, setValue } = useForm({
    defaultValues: initialData || {
      certifications: [{ title: "", document: null }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "certifications",
  });

  // State to track file names for display
  const [fileNames, setFileNames] = useState({});
  // State to store actual File objects
  const [fileObjects, setFileObjects] = useState({});

  // Load initial data if available
  useEffect(() => {
    if (initialData?.certifications) {
      const names = {};
      const files = {};

      initialData.certifications.forEach((cert, index) => {
        if (cert.document instanceof File) {
          names[index] = cert.document.name;
          files[index] = cert.document;
        }
      });

      setFileNames(names);
      setFileObjects(files);
    }
  }, [initialData]);

  const handleFileChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      // Store file in state
      setFileObjects((prev) => ({ ...prev, [index]: file }));
      setFileNames((prev) => ({ ...prev, [index]: file.name }));

      // Update form value
      setValue(`certifications.${index}.document`, file, { shouldDirty: true });
    }
  };

  const onFormSubmit = (data) => {
    // Merge file objects with form data
    const certificationsWithFiles = data.certifications.map((cert, index) => ({
      ...cert,
      document: fileObjects[index] || cert.document,
    }));

    onSubmit({
      ...data,
      certifications: certificationsWithFiles,
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Verification & Documentation
        </h3>
        <p className="text-sm text-gray-500 mb-6">Upload your certificates</p>

        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <label className="text-lg font-semibold">Certifications</label>
            <button
              type="button"
              onClick={() => append({ title: "", document: null })}
              className="flex items-center gap-1 text-orange-600 text-sm font-medium"
            >
              <Plus className="w-4 h-4" /> Add Another
            </button>
          </div>

          {fields.map((field, index) => (
            <div key={field.id} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <label className="block text-lg font-semibold mb-2">
                    Title
                  </label>
                  <input
                    {...register(`certifications.${index}.title`)}
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g., MBBS"
                  />
                </div>
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      remove(index);
                      setFileNames((prev) => {
                        const updated = { ...prev };
                        delete updated[index];
                        return updated;
                      });
                      setFileObjects((prev) => {
                        const updated = { ...prev };
                        delete updated[index];
                        return updated;
                      });
                    }}
                    className="ml-2 text-red-500"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>

              <div>
                <label className="block text-lg font-semibold mb-2">
                  Upload Document
                </label>
                <input
                  type="file"
                  accept=".pdf,.jpg,.png"
                  onChange={(e) => handleFileChange(index, e)}
                  className="hidden"
                  id={`file-${index}`}
                />
                <label
                  htmlFor={`file-${index}`}
                  className="border-2 border-dashed rounded-lg p-4 cursor-pointer flex flex-col items-center hover:border-orange-300 transition-colors"
                >
                  <Upload className="w-10 h-10 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">
                    {fileNames[index] || "Drag & drop or click to upload"}
                  </p>
                </label>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-3">
          {["confirm1", "confirm2", "confirm3"].map((name) => (
            <label key={name} className="flex items-start gap-2">
              <input type="checkbox" {...register(name)} className="mt-1" />
              <span className="text-sm text-gray-600">
                {name === "confirm1" && "Details match my medical license"}
                {name === "confirm2" && "No unqualified employees"}
                {name === "confirm3" && "Submitted valid certificates"}
              </span>
            </label>
          ))}
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-md p-4 mt-6">
          <p className="text-sm text-gray-700">
            Your application will be reviewed within 10-12 business days.
          </p>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-8 py-2 rounded-md border border-gray-300 text-lg font-semibold hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        <button
          onClick={handleSubmit(onFormSubmit)}
          className="bg-[#E26C29] hover:bg-orange-600 px-8 py-2 rounded-md flex items-center gap-2 text-white text-lg font-semibold transition-colors"
        >
          Next <MoveRight />
        </button>
      </div>
    </div>
  );
};
