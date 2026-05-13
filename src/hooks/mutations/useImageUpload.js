import { useMutation } from "@tanstack/react-query";
import { imageUploadAPI } from "../../api/image.api";

//* Upload image
export const useImageUpload = (options = {}) => {
  return useMutation({
    mutationFn: imageUploadAPI,
    ...options,
  });
};
