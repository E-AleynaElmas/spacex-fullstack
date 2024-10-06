import useCreateFeed from "@/api/mutations/useCreateFeed";
import useUploadFile from "@/api/mutations/useUploadFile";
import { ArrowBackCircleIcon } from "@/assets/icons/arrow-back-circle-icon";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import Dropzone from "./Dropzone";
import Modal from "./Modal/Modal";

interface FeedFormValues {
  title: string;
  date: string;
  description: string;
  imageUrl: File | null;
}

const schema = yup.object({
  title: yup.string().required("Title is required"),
  date: yup
    .string()
    .required("Date is required")
    .typeError("Invalid date format"), // Tarih string olarak alınacak
  description: yup.string().required("Description is required"),
  imageUrl: yup.mixed().nullable().required("Image is required"),
});

interface AddFeedModalProps {
  open: boolean;
  onClose: () => void;
  initialDate?: string; // Optional initial date prop
}

const AddFeedModal: React.FC<AddFeedModalProps> = ({
  open,
  onClose,
  initialDate,
}) => {
  const {
    control,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<FeedFormValues>({
    resolver: yupResolver(schema),
  });

  const firebaseImage = useUploadFile();
  const createFeed = useCreateFeed();

  useEffect(() => {
    if (initialDate) {
      setValue("date", ""); // initialDate varsa sadece saat seçimi yapılacak
    }
  }, [initialDate, setValue]);

  const onSubmit = async (data: FeedFormValues) => {
    let finalDate = data.date;

    if (initialDate) {
      // initialDate (tarih) ile seçilen saat birleştiriliyor
      const [hour, minute] = data.date.split(":");
      const combinedDate = new Date(initialDate);
      combinedDate.setHours(parseInt(hour));
      combinedDate.setMinutes(parseInt(minute));
      finalDate = combinedDate.toISOString(); // ISO string formatına çevriliyor
    }

    if (data.imageUrl) {
      try {
        const uploadResponse = await firebaseImage.mutateAsync({
          image: data.imageUrl,
        });

        const formData = {
          title: data.title,
          date: finalDate,
          description: data.description,
          imageUrl: uploadResponse.imageUrl || "",
        };
        console.log("Form data:", formData);

        await createFeed.mutateAsync(formData);
        onClose();
      } catch (error) {
        console.error("Dosya yükleme hatası:", error);
      }
    }
  };

  const handleImageChange = (file: File | null) => {
    setValue("imageUrl", file);
    trigger("imageUrl");
  };

  return (
    <Modal open={open} onClose={onClose} className="w-full md:w-1/2 lg:w-1/3">
      <div className="p-6 space-y-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Title</label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                />
              )}
            />
            {errors.title && (
              <span className="text-red-500 text-sm">
                {errors.title?.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Date</label>
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type={initialDate ? "time" : "datetime-local"} // initialDate varsa sadece saat seçimi yapılacak
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                />
              )}
            />
            {errors.date && (
              <span className="text-red-500 text-sm">
                {errors.date?.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Description</label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  rows={3}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                />
              )}
            />
            {errors.description && (
              <span className="text-red-500 text-sm">
                {errors.description?.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Image</label>
            <Dropzone onImageChange={handleImageChange} />
            {errors.imageUrl && (
              <span className="text-red-500 text-sm">
                {errors.imageUrl?.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg"
          >
            Submit
          </button>
        </form>
      </div>

      <button
        className="absolute right-5 top-5 z-50"
        onClick={() => {
          onClose();
        }}
      >
        <ArrowBackCircleIcon color="#f0f0f0" />
      </button>
    </Modal>
  );
};

export default AddFeedModal;
