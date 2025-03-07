import type { FinalCoffeeChoices } from "@/app/types";

export const CoffeeChoices = (props: {
  coffeeChoices: FinalCoffeeChoices;
}) => {
  const choiceConfig = [
    { key: "origin", label: "Your origin: ", value: props.coffeeChoices.origin },
    { key: "method", label: "Your method: ", value: props.coffeeChoices.method },
    { key: "combination", label: "Your combination: ", value: props.coffeeChoices.combination },
  ] as const;

  return (
    <div className="mt-2">
      <div className="flex justify-between">
        {choiceConfig.map((choice) => (
          <div
            key={choice.key}
            className="py-2 px-3 rounded-md bg-caramel text-text-light shadow-md flex-1 mx-1 text-sm md:text-base"
          >
            <p className="capitalize">
              {choice.label} {choice.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
