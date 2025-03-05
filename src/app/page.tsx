"use client";

import { formatMessage } from "@/app/utils";
import { useLandbotCore } from "./hooks/useLandbotCore";
import { useLandbotMessages } from "./hooks/useLandbotMessages";

export default function Home() {
  const { error, isLoading } = useLandbotCore();
  const { messages, sendMessage } = useLandbotMessages();

  if (error) {
    return <>Error: {error}</>;
  }

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <>
      {Object.values(messages).map((message) => {
        console.log("message in component", message);

        const formattedMessage = formatMessage(message);

        if (!formattedMessage) {
          return <></>;
        }

        if (formattedMessage.type === "text" || formattedMessage.type === "button") {
          return (
            <div key={message.key}>
              {formattedMessage.text}
              {formattedMessage.type}
            </div>
          );
        }

        return (
          <div key={message.key}>
            {formattedMessage.text}
            {formattedMessage.type}
            {formattedMessage?.buttons?.map((btn) => {
              console.log("btn", btn);
              return (
                <button
                  key={Math.random()}
                  type="button"
                  onClick={() => sendMessage({ payload: "$0" })}
                >
                  {btn}
                </button>
              );
            })}
            <p>{formattedMessage?.payloads}</p>
          </div>
        );
      })}
    </>
  );
}
