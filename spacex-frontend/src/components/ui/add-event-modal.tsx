import useCreateEvent from "@/api/mutations/useCreateEvent";
import useUploadFile from "@/api/mutations/useUploadFile";
import { ArrowBackCircleIcon } from "@/assets/icons/arrow-back-circle-icon";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Controller, useForm } from "react-hook-form";
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
    .date()
    .required("Date is required")
    .typeError("Invalid date format"),
  imageUrl: yup.mixed().nullable().required("Image is required"),
});

const AddEventModal: React.FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => {
  const {
    control,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<EventFormValues>({
    resolver: yupResolver(schema),
  });

  // useUploadFile ve useCreateEvent hooklarını çağırıyoruz
  const firebaseImage = useUploadFile();
  const createEvent = useCreateEvent();

  // Form gönderildiğinde çalışacak fonksiyon
  const onSubmit = async (data: EventFormValues) => {
    console.log("Form verileri:", data);

    const date = new Date(data.date);
    const offset = date.getTimezoneOffset() * 60000;
    const localDate = new Date(date.getTime() - offset)
      .toISOString()
      .slice(0, 19);

    if (data.imageUrl) {
      try {
        // Image upload işlemi
        const uploadResponse = await firebaseImage.mutateAsync({
          image: data.imageUrl,
        });

        console.log("Dosya yükleme başarılı:", uploadResponse);

        // formData içinde imageUrl'in doğru setlendiğinden emin olalım
        const formData = {
          title: data.title,
          date: localDate,
          imageUrl: uploadResponse.imageUrl || "", // Burada default boş değer atanabilir.
        };

        console.log("Oluşturulacak Etkinlik:", formData);

        // createEvent API isteğini yapıyoruz
        await createEvent.mutateAsync(formData);

        onClose();
      } catch (error) {
        console.error("Dosya yükleme hatası:", error);
      }
    } else {
      console.error("Resim yüklenemedi. imageUrl mevcut değil.");
    }
  };

  // Formdaki image güncellenince formun tekrar valide olup olmadığını kontrol edelim
  const handleImageChange = (file: File | null) => {
    setValue("imageUrl", file);
    trigger("imageUrl"); // Bu form validation'ını yeniden tetikleyecek
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

export default AddEventModal;
