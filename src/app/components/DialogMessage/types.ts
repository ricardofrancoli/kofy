export type ButtonsProps = {
  buttons: string[];
  payloads: string[];
  selectedButtonIndex: number | null;
  onButtonClick: (payload: string, index: number) => void;
};

export type OptionsButtonsProps = ButtonsProps;
export type ScaleButtonsProps = ButtonsProps & { scaleTags: [string, string] };

export type ButtonState = {
  isSelected: boolean;
  isDisabled: boolean;
  baseClasses: string;
  selectedClasses: string;
  disabledClasses: string;
};
