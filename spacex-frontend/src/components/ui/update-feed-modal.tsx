import useUpdateFeed from "@/api/mutations/useUpdateFeed";
import useUploadFile from "@/api/mutations/useUploadFile";
import { ArrowBackCircleIcon } from "@/assets/icons/arrow-back-circle-icon";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
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
    .typeError("Invalid date format"),
  description: yup.string().required("Description is required"),
});

interface UpdateFeedModalProps {
  open: boolean;
  onClose: () => void;
  feedData: {
    id: number;
    title: string;
    date: string;
    description: string;
    imageUrl: string;
  };
}

const UpdateFeedModal: React.FC<UpdateFeedModalProps> = ({
  open,
  onClose,
  feedData,
}) => {
  const {
    control,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<FeedFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: feedData.title,
      date: feedData.date,
      description: feedData.description,
    },
  });

  const firebaseImage = useUploadFile();
  const updateFeed = useUpdateFeed();
  const { t } = useTranslation();

  useEffect(() => {
    if (feedData.date) {
      const formattedDate = new Date(feedData.date)
        .toISOString()
        .substring(0, 16);
      setValue("date", formattedDate);
    }
  }, [feedData, setValue]);

  const onSubmit = async (data: FeedFormValues) => {
    const finalDate = new Date(data.date).toISOString();

    let imageUrl = feedData.imageUrl;

    if (data.imageUrl) {
      try {
        const uploadResponse = await firebaseImage.mutateAsync({
          image: data.imageUrl,
        });
        imageUrl = uploadResponse.imageUrl || "";
      } catch (error) {
        console.error("Dosya yükleme hatası:", error);
        return;
      }
    }

    const formData = {
      id: feedData.id,
      title: data.title,
      date: finalDate,
      description: data.description,
      imageUrl: imageUrl || feedData.imageUrl,
    };
    console.log("Güncellenmiş form verisi:", formData);

    await updateFeed.mutateAsync(formData);
    onClose();
  };

  const handleImageChange = (file: File | null) => {
    setValue("imageUrl", file);
    trigger("imageUrl");
  };
  console.log("feedData", feedData);

  return (
    <Modal open={open} onClose={onClose} className="w-full md:w-1/2 lg:w-1/3">
      <div className="p-6 space-y-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">
              {t("modal.title")}
            </label>
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
            <label className="block text-sm font-medium">
              {t("modal.date")}
            </label>
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="datetime-local"
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
            <label className="block text-sm font-medium">
              {t("modal.description")}
            </label>
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
            <label className="block text-sm font-medium">
              {t("modal.image")}
            </label>
            <Dropzone
              onImageChange={handleImageChange}
              defaultImageUrl={feedData.imageUrl}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg"
          >
            {t("modal.submit")}
          </button>
        </form>
      </div>

      <button className="absolute right-5 top-5 z-50" onClick={onClose}>
        <ArrowBackCircleIcon color="#f0f0f0" />
      </button>
    </Modal>
  );
};

export default UpdateFeedModal;
