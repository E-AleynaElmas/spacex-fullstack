import { TrashIcon } from "@/assets/icons/trash-icon";
import Image from "next/image";
import React, { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";

interface DropzoneProps {
  onImageChange: (file: File | null) => void;
  defaultImageUrl?: string; // Varsayılan resim URL'si
}

const Dropzone: React.FC<DropzoneProps> = ({
  onImageChange,
  defaultImageUrl,
}) => {
  const [selectedImage, setSelectedImage] = React.useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(
    defaultImageUrl || null
  );

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      onImageChange(file);
    },
    [onImageChange]
  );

  useEffect(() => {
    if (defaultImageUrl) {
      setPreviewUrl(defaultImageUrl); // Varsayılan resim URL'si varsa göster
    }
  }, [defaultImageUrl]);

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    onImageChange(null); // Resmi silmek için null değer ilet
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false,
  });

  return (
    <div {...getRootProps()} className="space-y-2 cursor-pointer">
      {!previewUrl ? (
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
            src={previewUrl}
            alt="Selected"
            className="w-full h-48 object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <button
              className="bg-black p-2 rounded-full"
              onClick={handleRemoveImage}
            >
              <TrashIcon className="w-6 h-6 " color="white"  />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropzone;
