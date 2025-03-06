import type { TextMessage as TextMessageType } from "@/app/types";

export const TextMessage = (props: TextMessageType) => {
  return (
    <>
      <h1>Text</h1>
      <p>{props.text}</p>
      <p>{props.type}</p>
      );
    </>
  );
};
