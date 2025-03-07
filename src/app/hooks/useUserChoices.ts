import {
  Combination,
  type DialogMessage,
  type FinalCoffeeChoices,
  Method,
  Origin,
} from "@/app/types";
import { useMemo, useState } from "react";

const findArrayThird = (arr: string[], searchValue: string): -1 | 0 | 1 | 2 => {
  const index = arr.indexOf(searchValue);

  if (index === -1) {
    return -1;
  }

  const thirdSize = arr.length / 3;

  if (index < thirdSize) {
    return 0;
  }

  if (index < thirdSize * 2) {
    return 1;
  }

  return 2;
};

export const useUserChoices = () => {
  const [originChoice, setOriginChoice] = useState<Origin>();
  const [methodChoice, setMethodChoice] = useState<Method>();
  const [combinationChoice, setCombinationChoice] = useState<Combination>();

  const totalCoffeeChoices = useMemo(
    () => [originChoice, methodChoice, combinationChoice].filter((choice) => choice).length,
    [originChoice, methodChoice, combinationChoice],
  );

  const addChoice = (
    selectedPayload: DialogMessage["payloads"][number],
    payloads: DialogMessage["payloads"],
  ) => {
    const payloadSection = findArrayThird(payloads, selectedPayload);
    console.log("payloadSection", payloadSection);
    console.log("totalCoffeeChoices", totalCoffeeChoices);

    if (payloadSection === -1) {
      throw new Error("Payload not found!");
    }

    if (![0, 1, 2].includes(totalCoffeeChoices)) {
      throw new Error("Too many choices!");
    }

    if (totalCoffeeChoices === 0) {
      setOriginChoice(Origin[payloadSection]);
    }

    if (totalCoffeeChoices === 1) {
      setMethodChoice(Method[payloadSection]);
    }

    if (totalCoffeeChoices === 2) {
      setCombinationChoice(Combination[payloadSection]);
    }
  };

  const getFinalCoffeeChoices = (): FinalCoffeeChoices | undefined => {
    if (
      originChoice !== undefined &&
      methodChoice !== undefined &&
      combinationChoice !== undefined
    ) {
      return {
        origin: originChoice,
        method: methodChoice,
        combination: combinationChoice,
      };
    }

    return undefined;
  };

  return {
    finalCoffeeChoices: getFinalCoffeeChoices(),
    totalCoffeeChoices,
    addChoice,
  };
};
