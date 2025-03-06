import type { FormattedMessage } from "@/app/types";
import type { Message } from "@landbot/core/dist/types";

const getMessageText = (message: Message): string | undefined => {
  // @ts-expect-error: rich_text, text should be included in type
  return message.rich_text ?? message.text ?? message.message;
};

export const formatMessage = (message: Message): FormattedMessage => {
  // TODO: handle error in case of no text?
  const commonFields = {
    id: message.key,
    text: getMessageText(message),
    timestamp: message.timestamp,
  };

  if (message.type === "text") {
    return {
      type: "text",
      ...commonFields,
    };
  }

  if (message.type === "dialog") {
    return {
      type: "dialog",
      // @ts-expect-error: buttons should be included in type
      buttons: message.buttons,
      // @ts-expect-error: payloads should be included in type
      payloads: message.payloads,
      ...commonFields,
    };
  }

  // TODO: better handle error. Perhaps only allow valid messages
  console.warn("message not included", message);
  throw new Error("Invalid button type");
};
