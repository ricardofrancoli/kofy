import type { Message, SendingMessage } from "@landbot/core/dist/types";
import { useEffect, useState } from "react";
import { useLandbotCore } from "./useLandbotCore";

type MessageKey = string;

export const useLandbotMessages = () => {
  const { coreRef } = useLandbotCore();
  const [messages, setMessages] = useState<Record<MessageKey, Message>>({});

  useEffect(() => {
    console.log("calling messages", coreRef.current);
    if (!coreRef.current) {
      return;
    }

    coreRef.current.pipelines.$readableSequence.subscribe((message) => {
      console.log("new message!");

      setMessages((prevMessages) => ({
        ...prevMessages,
        [message.key]: message,
      }));
    });
  }, [coreRef.current]);

  const sendMessage = async (sendingMessage: Partial<SendingMessage>) => {
    if (!coreRef.current) {
      throw new Error("Landbot isn't defined");
    }

    console.log("sending message", sendingMessage);

    await coreRef.current.sendMessage({
      payload: sendingMessage.payload,
      type: "button",
    });
  };

  return {
    messages,
    sendMessage,
  };
};
