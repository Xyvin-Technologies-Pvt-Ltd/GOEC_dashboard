import { useMutation } from "@tanstack/react-query";
import {
  sendBulkMail,
  sendBulkPushNotification,
} from "../../services/notificationAPI";

//* Send bulk mail
export const useSendBulkMail = (options = {}) => {
  return useMutation({
    mutationFn: sendBulkMail,
    ...options,
  });
};

//* Send bulk push notification
export const useSendBulkPushNotification = (options = {}) => {
  return useMutation({
    mutationFn: sendBulkPushNotification,
    ...options,
  });
};
