import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { OptionsButtons } from "../DialogMessage/OptionsButtons";
import type { ButtonsProps } from "../DialogMessage/types";

describe("OptionsButtons", () => {
  it("should render all buttons correctly", () => {
    const props: ButtonsProps = {
      buttons: ["Option 1", "Option 2", "Option 3"],
      payloads: ["$1", "$2", "$3"],
      selectedButtonIndex: null,
      onButtonClick: vi.fn(),
    };

    render(<OptionsButtons {...props} />);

    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
    expect(screen.getByText("Option 3")).toBeInTheDocument();
  });

  it("should call onButtonClick with correct payload when clicked", () => {
    const onButtonClick = vi.fn();
    const props: ButtonsProps = {
      buttons: ["Option 1", "Option 2"],
      payloads: ["$1", "$2"],
      selectedButtonIndex: null,
      onButtonClick,
    };

    render(<OptionsButtons {...props} />);

    fireEvent.click(screen.getByText("Option 2"));

    expect(onButtonClick).toHaveBeenCalledWith("$2", 1);
  });

  it("should disable all buttons when one is selected", () => {
    const props: ButtonsProps = {
      buttons: ["Option 1", "Option 2", "Option 3"],
      payloads: ["$1", "$2", "$3"],
      selectedButtonIndex: 1, // Option 2 is selected
      onButtonClick: vi.fn(),
    };

    render(<OptionsButtons {...props} />);

    // All buttons should be disabled
    const buttons = screen.getAllByRole("button");
    // biome-ignore lint/complexity/noForEach: <explanation>
    buttons.forEach((button) => {
      expect(button).toBeDisabled();
    });

    // Selected button should have the checkmark or selected class
    expect(screen.getByText("Option 2").closest("button")).toHaveClass("bg-selected");
  });
});
