import type { ButtonState } from "@/app/components/DialogMessage/types";

export const getButtonState = (index: number, selectedIndex: number | null): ButtonState => {
  const isSelected = selectedIndex === index;
  const isDisabled = selectedIndex !== null;

  const baseClasses = `
    py-2 px-3 rounded-md text-text-light shadow-md
    transition-all duration-300
  `;

  const selectedClasses = "bg-selected cursor-default";

  const disabledClasses = "opacity-60 cursor-not-allowed";

  return {
    isSelected,
    isDisabled,
    baseClasses,
    selectedClasses,
    disabledClasses,
  };
};
