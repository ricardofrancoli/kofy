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
        {props.buttons.map((btn) => {
          console.log("btn", btn);
          return (
            <button key={Math.random()} type="button" onClick={() => props.onButtonClick("$0")}>
              {btn}
            </button>
          );
        })}
        <p>{props.payloads}</p>
      </div>
      );
    </>
  );
};
