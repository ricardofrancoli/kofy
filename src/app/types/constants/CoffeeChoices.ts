export const Origin = ["ethiopia", "costa rica", "indonesia"] as const;
export type Origin = (typeof Origin)[number];

export const Method = ["espresso", "filter", "moka"] as const;
export type Method = (typeof Method)[number];

export const Combination = ["plain", "milk", "sugar"] as const;
export type Combination = (typeof Combination)[number];

export const CoffeeChoices = [Origin, Method, Combination] as const;
export type CoffeeChoicesTuple = [Origin?, Method?, Combination?];

export type FinalCoffeeChoices = {
  origin: Origin;
  method: Method;
  combination: Combination;
};
