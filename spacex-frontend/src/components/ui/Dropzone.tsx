import { TrashIcon } from "@/assets/icons/trash-icon";
import Image from "next/image";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface DropzoneProps {
  onImageChange: (file: File | null) => void;
}

const Dropzone: React.FC<DropzoneProps> = ({ onImageChange }) => {
  const [selectedImage, setSelectedImage] = React.useState<File | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      setSelectedImage(file);
      onImageChange(file);
    },
    [onImageChange]
  );

  const handleRemoveImage = () => {
    setSelectedImage(null);
    onImageChange(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false,
  });

  return (
    <div {...getRootProps()} className="space-y-2 cursor-pointer">
      {!selectedImage ? (
        <div
          className={`p-4 text-center border-2 border-dashed border-gray-300 rounded-lg ${
            isDragActive ? "bg-gray-100" : ""
          }`}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="text-gray-500">Drop the image here...</p>
          ) : (
            <p className="text-gray-500">
              Drag n drop an image, or click to select one
            </p>
          )}
        </div>
      ) : (
        <div className="relative">
          <Image
            width={192}
            height={192}
            src={URL.createObjectURL(selectedImage)}
            alt="Selected"
            className="w-full h-48 object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <button
              className="bg-white p-2 rounded-full"
              onClick={handleRemoveImage}
            >
              <TrashIcon className="w-6 h-6 text-red-500" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropzone;
