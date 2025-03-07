import type { FormattedMessage } from "@/app/types";
import type { Message } from "@landbot/core/dist/types";
import DOMPurify from "dompurify";

const getMessageText = (message: Message): string | undefined => {
  return (
    // @ts-expect-error: rich_text should be included in type
    DOMPurify.sanitize(message.rich_text, {
      USE_PROFILES: {
        html: false,
      },
    }) ??
    // @ts-expect-error: text should be included in type
    message.text ??
    message.message
  );
};

export const formatMessage = (message: Message): FormattedMessage => {
  // console.log("message", message);
  // TODO: handle error in case of no text?
  const commonFields = {
    id: message.key,
    // @ts-expect-error: extra.welcome should be included in type
    isWelcome: !!message.extra?.welcome,
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
    const commonDialogFields = {
      type: "dialog",
      // @ts-expect-error: buttons should be included in type
      buttons: message.buttons,
      // @ts-expect-error: payloads should be included in type
      payloads: message.payloads,
      ...commonFields,
    } as const;

    // @ts-expect-error: extra.tags.should be included in type
    const scaleTags: [string, string] | undefined = message.extra?.buttons?.tags;

    if (!scaleTags) {
      return {
        subType: "options",
        ...commonDialogFields,
      };
    }

    return {
      subType: "scale",
      scaleTags,
      ...commonDialogFields,
    };
  }

  // TODO: better handle error. Perhaps only allow valid messages
  console.warn("message not included", message);
  throw new Error("Invalid button type");
};
