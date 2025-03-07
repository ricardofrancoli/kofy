import type { MessagesRecord } from "@/app/types";
import type LandbotCore from "@landbot/core";
import type { ConfigProperties, SendingMessage } from "@landbot/core/dist/types";
import ky from "ky";
import { useEffect, useRef, useState } from "react";
import { isValidMessageType } from "../utils";

// const CONFIG_URL = "https://landbot.online/v3/H-2814377-7W1AV8VP9CUPOV1X/index.json";
const CONFIG_URL = "https://landbot.online/v3/H-2817215-F3HLNVI4EF4YM54P/index.json";

export const useLandbotMessages = () => {
  const [messages, setMessages] = useState<MessagesRecord>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const coreRef = useRef<LandbotCore | null>(null);

  useEffect(() => {
    const initialise = async () => {
      setIsLoading(true);

      try {
        const { Core: LandbotCore } = await import("@landbot/core");

        const config = await ky.get<ConfigProperties>(CONFIG_URL).json();

        coreRef.current = new LandbotCore(config);

        if (!coreRef.current) {
          throw new Error("Failed to initialise Landbot");
        }

        await coreRef.current.init();

        coreRef.current.pipelines.$readableSequence.subscribe((message) => {
          if (!isValidMessageType(message)) {
            return;
          }

          setMessages((prevMessages) => ({
            ...prevMessages,
            [message.key]: message,
          }));
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error when initialising Landbot");
        console.error("err", err);
      } finally {
        setIsLoading(false);
      }
    };

    initialise();

    return () => {
      if (coreRef.current) {
        coreRef.current.destroy();
        coreRef.current = null;
      }
    };
  }, []);

  const sendMessage = async (sendingMessage: Partial<SendingMessage>) => {
    if (!coreRef.current) {
      throw new Error("Landbot isn't defined");
    }

    await coreRef.current.sendMessage({
      payload: sendingMessage.payload,
      type: "button",
    });
  };

  return {
    error,
    isLoading,
    messages,
    sendMessage,
  };
};
