import type LandbotCore from "@landbot/core";
import ky from "ky";
import { useEffect, useRef, useState } from "react";

const CONFIG_URL = "https://chats.landbot.io/u/H-441480-B0Q96FP58V53BJ2J/index.json";

export const useLandbotCore = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const coreRef = useRef<LandbotCore | null>(null);

  useEffect(() => {
    const initialise = async () => {
      setIsLoading(true);

      try {
        const { Core: LandbotCore } = await import("@landbot/core");

        const config = await ky.get(CONFIG_URL).json();

        console.log("config", config);

        // @ts-expect-error: TODO validate config value
        coreRef.current = new LandbotCore(config);

        console.log("coreRef", coreRef.current);

        if (!coreRef.current) {
          throw new Error("Failed to initialise Landbot");
        }

        await coreRef.current.init();

        // console.log("send message", await coreRef.current.sendMessage({ message: "Hey bro!" }));
        // console.log("latest msgs", await coreRef.current.getLastMessages(10));
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

  return {
    isLoading,
    error,
  };
};
