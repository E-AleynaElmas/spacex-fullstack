import { useMutation } from "@tanstack/react-query";

interface UploadFileData {
    image: File;
    }   

const useUploadFile = () => {
  return useMutation({
    mutationFn: async (data: UploadFileData ) => {
      const formData = new FormData();
      formData.append("image", data.image);

      // URL'yi burada doğru ayarladığından emin ol.
      const response = await fetch("http://localhost:3000/file/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("File upload failed");
      }

      return response.json(); // JSON yanıtı döndürüyoruz
    },
  });
};

export default useUploadFile;
