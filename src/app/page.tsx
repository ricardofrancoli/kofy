"use client";

import { DialogMessage } from "./components/DialogMessage";
import { TextMessage } from "./components/TextMessage";
import { useLandbotMessages } from "./hooks/useLandbotMessages";
import { useStreamedMessages } from "./hooks/useStreamedMessages";
import { ValidMessageType } from "./types";

export default function Home() {
  const { error, isLoading, messages, sendMessage } = useLandbotMessages();
  const { streamedMessages } = useStreamedMessages(messages);

  const onButtonClick = (payload: string) => {
    sendMessage({ payload });
  };

  if (error) {
    return <>Error: {error}</>;
  }

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <>
      {streamedMessages.map((streamedMessage) => {
        console.log("streamedMessage in component", streamedMessage);

        if (streamedMessage.type === ValidMessageType.text) {
          return (
            <div key={streamedMessage.id}>
              <TextMessage {...streamedMessage} />
            </div>
          );
        }

        return (
          <div key={streamedMessage.id}>
            <DialogMessage {...streamedMessage} onButtonClick={onButtonClick} />
          </div>
        );
      })}
    </>
  );
}
