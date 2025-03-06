import { type FormattedMessage, ValidMessageType } from "@/app/types";
import type { Message } from "@landbot/core/dist/types";

export const isValidMessageType = <T extends FormattedMessage | Message>(
  message: T,
): message is T => {
  return message.type === ValidMessageType.dialog || message.type === ValidMessageType.text;
};
