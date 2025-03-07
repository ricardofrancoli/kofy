import { type TextMessage as TextMessageType, ValidMessageType } from "@/app/types";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TextMessage } from "../TextMessage";

describe("TextMessage", () => {
  it("should render the message text correctly", () => {
    const message: TextMessageType = {
      id: "123",
      isWelcome: false,
      text: "Hello, this is a test message",
      type: ValidMessageType.text,
      timestamp: Date.now(),
    };

    render(<TextMessage {...message} />);

    expect(screen.getByText("Hello, this is a test message")).toBeDefined();
  });

  it("starts with opacity-0 class and transitions to opacity-100", async () => {
    const message: TextMessageType = {
      id: "123",
      isWelcome: false,
      text: "Hello, this is a test message",
      type: ValidMessageType.text,
      timestamp: Date.now(),
    };

    const { container } = render(<TextMessage {...message} />);

    const animatedDiv = container.querySelector(".flex.w-full.my-2");

    expect(animatedDiv).toHaveClass("opacity-0");

    vi.useFakeTimers();
    vi.advanceTimersByTime(300);
    vi.useRealTimers();

    await waitFor(() => {
      expect(animatedDiv).toHaveClass("opacity-100");
    });
  });
});
