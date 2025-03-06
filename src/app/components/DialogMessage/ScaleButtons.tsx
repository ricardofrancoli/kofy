import { getButtonState } from "@/app/utils";
import type { ScaleButtonsProps } from "./types";

export const ScaleButtons = ({
  buttons,
  payloads,
  scaleTags,
  selectedButtonIndex,
  onButtonClick,
}: ScaleButtonsProps) => {
  const getScaleColorClass = (index: number) => {
    const scaleColors = ["bg-scale-1", "bg-scale-2", "bg-scale-3", "bg-scale-4", "bg-scale-5"];

    return scaleColors[Math.min(index, scaleColors.length - 1)];
  };

  return (
    <div className="mt-2">
      <div className="flex justify-between mb-2 px-1">
        <div className="text-text-light text-xs opacity-80">{scaleTags[0]}</div>
        <div className="text-text-light text-xs opacity-80">{scaleTags[1]}</div>
      </div>

      <div className="flex justify-between">
        {buttons.map((button, i) => {
          const { isSelected, isDisabled, baseClasses, selectedClasses, disabledClasses } =
            getButtonState(i, selectedButtonIndex);

          return (
            <button
              key={button}
              type="button"
              onClick={() => !isDisabled && onButtonClick(payloads[i], i)}
              disabled={isDisabled}
              className={`
                ${baseClasses} flex-1 mx-1 text-sm md:text-base
                ${
                  isSelected
                    ? selectedClasses
                    : `${getScaleColorClass(i)} ${isDisabled ? disabledClasses : "cursor-pointer"}`
                }
              `}
            >
              {button}
              {isSelected && <span className="ml-2 text-xs">✓</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
};
