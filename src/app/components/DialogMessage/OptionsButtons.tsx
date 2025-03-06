import { getButtonState } from "@/app/utils";
import type { ButtonsProps } from "./types";

export const OptionsButtons = ({
  buttons,
  payloads,
  selectedButtonIndex,
  onButtonClick,
}: ButtonsProps) => {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
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
              ${baseClasses} px-4
              ${
                isSelected
                  ? selectedClasses
                  : `bg-coffee-dark hover:bg-mocha ${isDisabled ? disabledClasses : "cursor-pointer"}`
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
