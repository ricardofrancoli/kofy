import type LandbotCore from "@landbot/core";
import ky from "ky";
import { useEffect, useRef, useState } from "react";

const CONFIG_URL = "https://landbot.online/v3/H-2814377-7W1AV8VP9CUPOV1X/index.json";

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
    coreRef,
  };
};
