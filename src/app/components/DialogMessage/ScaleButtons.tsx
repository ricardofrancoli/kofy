import { getButtonState } from "@/app/utils";
import type { ButtonsProps } from "./types";

export const ScaleButtons = ({
  buttons,
  payloads,
  selectedButtonIndex,
  onButtonClick,
}: ButtonsProps) => {
  const getScaleColorClass = (index: number) => {
    const scaleColors = ["bg-scale-1", "bg-scale-2", "bg-scale-3", "bg-scale-4", "bg-scale-5"];

    return scaleColors[Math.min(index, scaleColors.length - 1)];
  };

  return (
    <div className="flex justify-between mt-2">
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
          </button>
        );
      })}
    </div>
  );
};
