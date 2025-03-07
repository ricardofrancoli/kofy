import { useUserChoices } from "@/app/hooks/useUserChoices";
import { Combination, Method, Origin } from "@/app/types";
import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("useUserChoices", () => {
  it("should initialise with no coffee choices", () => {
    const { result } = renderHook(() => useUserChoices());

    expect(result.current.totalCoffeeChoices).toBe(0);
    expect(result.current.finalCoffeeChoices).toBeUndefined();
  });

  it("should add origin choice as first selection", () => {
    const { result } = renderHook(() => useUserChoices());

    const payloads = ["origin_0", "origin_1", "origin_2"];

    act(() => {
      result.current.addChoice("origin_1", payloads);
    });

    expect(result.current.totalCoffeeChoices).toBe(1);
    expect(result.current.finalCoffeeChoices).toBeUndefined();
  });

  it("should add method choice as second selection", () => {
    const { result } = renderHook(() => useUserChoices());

    act(() => {
      result.current.addChoice("origin_0", ["origin_0", "origin_1", "origin_2"]);
    });

    act(() => {
      result.current.addChoice("method_2", ["method_0", "method_1", "method_2"]);
    });

    expect(result.current.totalCoffeeChoices).toBe(2);
    expect(result.current.finalCoffeeChoices).toBeUndefined();
  });

  it("should provide final coffee choices after all three selections", () => {
    const { result } = renderHook(() => useUserChoices());

    act(() => {
      result.current.addChoice("origin_0", ["origin_0", "origin_1", "origin_2"]);
    });

    act(() => {
      result.current.addChoice("method_1", ["method_0", "method_1", "method_2"]);
    });

    act(() => {
      result.current.addChoice("combo_2", ["combo_0", "combo_1", "combo_2"]);
    });

    expect(result.current.totalCoffeeChoices).toBe(3);
    expect(result.current.finalCoffeeChoices).toBeDefined();
    expect(result.current.finalCoffeeChoices).toEqual({
      origin: Origin[0],
      method: Method[1],
      combination: Combination[2],
    });
  });
});
