import { type DialogMessage as DialogMessageType, ValidMessageType } from "@/app/types";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { DialogMessage } from "../DialogMessage/DialogMessage";

vi.mock("../DialogMessage/OptionsButtons", () => ({
  OptionsButtons: () => <div data-testid="options-buttons">OptionsButtons Component</div>,
}));

vi.mock("../DialogMessage/ScaleButtons", () => ({
  ScaleButtons: () => <div data-testid="scale-buttons">ScaleButtons Component</div>,
}));

describe("DialogMessage", () => {
  const messageCommonProps = {
    buttons: ["1", "2", "3"],
    id: "123",
    isWelcome: false,
    payloads: ["$0", "$1", "$2"],
    text: "Hello, this is a test message",
    type: ValidMessageType.dialog,
    timestamp: Date.now(),
  };

  const optionsMessageSubType: DialogMessageType = {
    ...messageCommonProps,
    subType: "options",
  };

  const scaleMessageSubType: DialogMessageType = {
    ...messageCommonProps,
    subType: "scale",
    scaleTags: ["high", "low"],
  };

  it("should render the message text correctly (options)", () => {
    render(<DialogMessage {...optionsMessageSubType} onButtonClick={() => {}} />);

    expect(screen.getByText("Hello, this is a test message")).toBeDefined();
  });

  it("should render the message text correctly (scale)", () => {
    render(<DialogMessage {...scaleMessageSubType} onButtonClick={() => {}} />);

    expect(screen.getByText("Hello, this is a test message")).toBeDefined();
  });

  it("should render OptionsButtons if subType is 'options'", () => {
    render(<DialogMessage {...optionsMessageSubType} onButtonClick={() => {}} />);

    expect(screen.getByTestId("options-buttons")).toBeInTheDocument();
    expect(screen.queryByTestId("scale-buttons")).not.toBeInTheDocument();
  });

  it("should render ScaleButtons if subType is 'scale'", () => {
    render(<DialogMessage {...scaleMessageSubType} onButtonClick={() => {}} />);

    expect(screen.getByTestId("scale-buttons")).toBeInTheDocument();
    expect(screen.queryByTestId("options-buttons")).not.toBeInTheDocument();
  });
});
