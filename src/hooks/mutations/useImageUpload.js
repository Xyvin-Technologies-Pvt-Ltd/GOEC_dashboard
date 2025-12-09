import { useMutation } from "@tanstack/react-query";
import { imageUploadAPI } from "../../services/imageAPI";

//* Upload image
export const useImageUpload = (options = {}) => {
  return useMutation({
    mutationFn: imageUploadAPI,
    ...options,
  });
};
