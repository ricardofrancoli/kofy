import type { DialogMessage as DialogMessageType } from "@/app/types";
import { useEffect, useState } from "react";
import { OptionsButtons } from "./OptionsButtons";
import { ScaleButtons } from "./ScaleButtons";

type DialogMessageProps = DialogMessageType & {
  onButtonClick: (payload: string) => void;
};

export const DialogMessage = (props: DialogMessageProps) => {
  const [selectedButtonIndex, setSelectedButtonIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [buttonsVisible, setButtonsVisible] = useState(false);

  const isScale = props.subType === "scale";

  useEffect(() => {
    const messageTimeout = setTimeout(() => {
      setIsVisible(true);

      const buttonTimeout = setTimeout(() => {
        setButtonsVisible(true);
      }, 500);

      return () => clearTimeout(buttonTimeout);
    }, 300);

    return () => clearTimeout(messageTimeout);
  }, []);

  const handleButtonClick = (payload: string, index: number) => {
    setSelectedButtonIndex(index);
    props.onButtonClick(payload);
  };

  return (
    <div className="flex flex-col w-full my-2">
      <div
        className={`
          bg-coffee-medium text-text-light p-3 rounded-lg rounded-bl-none 
          max-w-xs md:max-w-md lg:max-w-lg self-start mb-2 shadow-md
          transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
        `}
      >
        <p className="text-sm md:text-base">{props.text}</p>
      </div>

      {props.buttons && props.buttons.length > 0 && (
        <div
          className={`transition-opacity duration-500 ${buttonsVisible ? "opacity-100" : "opacity-0"}`}
        >
          {isScale ? (
            <ScaleButtons
              buttons={props.buttons}
              payloads={props.payloads}
              scaleTags={props.scaleTags}
              selectedButtonIndex={selectedButtonIndex}
              onButtonClick={handleButtonClick}
            />
          ) : (
            <OptionsButtons
              buttons={props.buttons}
              payloads={props.payloads}
              selectedButtonIndex={selectedButtonIndex}
              onButtonClick={handleButtonClick}
            />
          )}
        </div>
      )}
    </div>
  );
};
