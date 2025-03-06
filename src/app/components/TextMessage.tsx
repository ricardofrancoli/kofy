import type { TextMessage as TextMessageType } from "@/app/types";
import { useEffect, useState } from "react";

export const TextMessage = (props: TextMessageType) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Add a small delay before showing the message for a typing effect
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={`flex w-full my-2 justify-start transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`
          max-w-xs md:max-w-md lg:max-w-lg rounded-lg p-3 
          bg-coffee-medium text-text-light rounded-bl-none
          shadow-md hover:shadow-lg transition-all duration-300
          transform ${isVisible ? "translate-y-0" : "translate-y-4"}
        `}
      >
        <p className="text-sm md:text-base">{props.text}</p>
      </div>
    </div>
  );
};
