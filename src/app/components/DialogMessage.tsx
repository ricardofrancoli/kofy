import type { DialogMessage as DialogMessageType } from "@/app/types";
import { useEffect, useState } from "react";

type DialogMessageProps = DialogMessageType & {
  onButtonClick: (payload: string) => void;
};

export const DialogMessage = (props: DialogMessageProps) => {
  const [selectedButtonIndex, setSelectedButtonIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [buttonsVisible, setButtonsVisible] = useState(false);

  const isScale = props.buttons.length === 6;

  useEffect(() => {
    // Stagger the animations
    const messageTimeout = setTimeout(() => {
      setIsVisible(true);

      // Show buttons after message appears
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

  const getScaleColorClass = (index: number, isSelected: boolean) => {
    const scaleColors = ["bg-scale-1", "bg-scale-2", "bg-scale-3", "bg-scale-4", "bg-scale-5"];

    const baseColor = scaleColors[Math.min(index, scaleColors.length - 1)];

    if (isSelected) {
      return "bg-selected border border-selected-dark";
    }

    if (selectedButtonIndex !== null) {
      return `${baseColor} opacity-60`;
    }

    return baseColor;
  };

  return (
    <div className="flex flex-col w-full my-2">
      <div
        className={`
          bg-coffee-medium text-text-light p-3 rounded-lg rounded-bl-none 
          max-w-lg self-start mb-2
          shadow-md hover:shadow-lg transition-all duration-500
          transform ${isVisible ? "translate-y-0" : "translate-y-4"}
          ${isVisible ? "opacity-100" : "opacity-0"}
        `}
      >
        <p className="text-base">{props.text}</p>
      </div>

      {props.buttons && props.buttons.length > 0 && (
        <div
          className={`
            ${isScale ? "flex justify-between" : "flex flex-wrap gap-2"} 
            mt-2 transition-opacity duration-500 ease-in-out
            ${buttonsVisible ? "opacity-100" : "opacity-0"}
          `}
        >
          {isScale
            ? // Scale option layout - horizontal
              props.buttons.map((button, i) => {
                const isSelected = selectedButtonIndex === i;
                return (
                  <button
                    key={button}
                    type="button"
                    onClick={() =>
                      selectedButtonIndex === null && handleButtonClick(props.payloads[i], i)
                    }
                    disabled={selectedButtonIndex !== null}
                    className={`
                      ${getScaleColorClass(i, isSelected)} text-text-light py-2 px-3 rounded-md 
                      hover:scale-[1.02] active:scale-[0.98]
                      transition-all duration-300 ease-in-out
                      shadow-md hover:shadow-lg flex-1 mx-1 text-base
                      ${selectedButtonIndex !== null ? "cursor-not-allowed" : "cursor-pointer"}
                    `}
                  >
                    {button}
                    {isSelected && <span className="ml-2 text-xs">✓</span>}
                  </button>
                );
              })
            : // Regular options layout
              props.buttons.map((button, i) => {
                const isSelected = selectedButtonIndex === i;
                return (
                  <button
                    key={button}
                    type="button"
                    onClick={() =>
                      selectedButtonIndex === null && handleButtonClick(props.payloads[i], i)
                    }
                    disabled={selectedButtonIndex !== null}
                    className={`
                      py-2 px-4 rounded-md text-text-light
                      hover:scale-[1.02] active:scale-[0.98]
                      transition-all duration-300 ease-in-out
                      shadow-md hover:shadow-lg
                      ${
                        isSelected
                          ? "bg-selected border border-selected-dark cursor-default"
                          : `bg-coffee-dark ${selectedButtonIndex !== null ? "opacity-60 cursor-not-allowed" : "hover:bg-coffee-light cursor-pointer"}`
                      }
                    `}
                  >
                    {button}
                    {isSelected && <span className="ml-2 text-xs">✓</span>}
                  </button>
                );
              })}
        </div>
      )}
    </div>
  );
};
