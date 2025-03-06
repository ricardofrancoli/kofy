import { formatMessage } from "@/app/utils";
import { useMemo } from "react";
import type { MessagesRecord } from "../types/messagesRecord";

export const useStreamedMessages = (messages: MessagesRecord) => {
  const streamedMessages = useMemo(() => {
    return Object.values(messages)
      .map((message) => formatMessage(message))
      .sort((a, b) => a.timestamp - b.timestamp);
  }, [messages]);

  return {
    streamedMessages,
  };
};
