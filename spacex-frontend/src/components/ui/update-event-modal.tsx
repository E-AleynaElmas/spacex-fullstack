import useUpdateEvent from "@/api/mutations/useUpdateEvent";
import useUploadFile from "@/api/mutations/useUploadFile";
import { ArrowBackCircleIcon } from "@/assets/icons/arrow-back-circle-icon";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import Dropzone from "./Dropzone";
import Modal from "./Modal/Modal";

interface EventFormValues {
  title: string;
  date: string;
  imageUrl: File | null;
}

const schema = yup.object({
  title: yup.string().required("Title is required"),
  date: yup
    .string()
    .required("Date is required")
    .typeError("Invalid date format"),
});

interface UpdateEventModalProps {
  open: boolean;
  onClose: () => void;
  eventData: {
    id: number;
    title: string;
    date: string;
    imageUrl: string;
  };
}

const UpdateEventModal: React.FC<UpdateEventModalProps> = ({
  open,
  onClose,
  eventData,
}) => {
  const {
    control,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<EventFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: eventData.title,
      date: eventData.date,
    },
  });

  const firebaseImage = useUploadFile();
  const updateEvent = useUpdateEvent();
  const { t } = useTranslation();

  useEffect(() => {
    if (eventData.date) {
      const formattedDate = new Date(eventData.date)
        .toISOString()
        .substring(0, 16);
      setValue("date", formattedDate);
    }
  }, [eventData, setValue]);

  const onSubmit = async (data: EventFormValues) => {
    const finalDate = new Date(data.date).toISOString();

    let imageUrl = eventData.imageUrl;

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
      id: eventData.id,
      title: data.title,
      date: finalDate,
      imageUrl: imageUrl || eventData.imageUrl,
    };
    console.log("Güncellenmiş form verisi:", formData);

    await updateEvent.mutateAsync(formData);
    onClose();
  };

  const handleImageChange = (file: File | null) => {
    setValue("imageUrl", file);
    trigger("imageUrl");
  };
  console.log("eventData", eventData);

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
              {t("modal.image")}
            </label>
            <Dropzone
              onImageChange={handleImageChange}
              defaultImageUrl={eventData.imageUrl}
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

export default UpdateEventModal;