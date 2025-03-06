import type { DialogMessage as DialogMessageType } from "@/app/types";

type DialogMessageProps = DialogMessageType & {
  onButtonClick: (payload: string) => void;
};

export const DialogMessage = (props: DialogMessageProps) => {
  return (
    <>
      <h1>Dialog</h1>
      <div>
        {props.text}
        {props.type}
        {props.buttons.map((buttonText, i) => {
          return (
            <button
              key={buttonText}
              type="button"
              onClick={() => props.onButtonClick(props.payloads[i])}
            >
              {buttonText}
            </button>
          );
        })}
      </div>
      );
    </>
  );
};
