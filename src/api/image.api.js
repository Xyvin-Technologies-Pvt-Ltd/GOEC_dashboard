import { uploadClient } from "./clients";



export async function imageUploadAPI(file) {
    try {
      const form = new FormData();
      form.append('image', file);
      const response = await uploadClient.post(
        `/image/upload`,
        form
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }