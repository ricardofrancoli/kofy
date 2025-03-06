"use client";

import { useCallback, useEffect, useRef } from "react";
import { DialogMessage } from "./components/DialogMessage";
import { TextMessage } from "./components/TextMessage";
import { useLandbotMessages } from "./hooks/useLandbotMessages";
import { useStreamedMessages } from "./hooks/useStreamedMessages";
import { ValidMessageType } from "./types";

export default function Home() {
  const { error, isLoading, messages, sendMessage } = useLandbotMessages();
  const { streamedMessages } = useStreamedMessages(messages);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (messagesContainerRef.current) {
      const scrollOptions: ScrollToOptions = {
        top: messagesContainerRef.current.scrollHeight,
        behavior: "smooth",
      };
      messagesContainerRef.current.scrollTo(scrollOptions);
    }
  }, []);

  useEffect(() => {
    if (!streamedMessages.length) {
      return;
    }

    scrollToBottom();
  }, [scrollToBottom, streamedMessages]);

  const onButtonClick = (payload: string) => {
    sendMessage({ payload });
  };

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 bg-coffee-dark">
        Error: {error}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-coffee-dark">
        <div className="animate-pulse flex space-x-4">
          <div className="h-12 w-12 bg-coffee-light rounded-full animate-bounce" />
          <div
            className="h-12 w-12 bg-caramel rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          />
          <div
            className="h-12 w-12 bg-mocha rounded-full animate-bounce"
            style={{ animationDelay: "0.4s" }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-coffee-dark">
      <div className="w-full max-w-2xl bg-cream-light p-4 rounded-lg shadow-coffee flex flex-col h-[80vh] border-2 border-border">
        <div className="text-xl font-bold mb-4 p-3 border-b-2 border-border text-text-dark flex items-center">
          <span className="text-2xl mr-2">☕</span>
          <span>Kofy</span>
          <span className="ml-auto text-sm italic text-mocha">The Roast Master</span>
        </div>

        <div
          ref={messagesContainerRef}
          className="flex-grow overflow-y-auto p-2 scrollbar-coffee scroll-smooth"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <div className="space-y-4">
            {streamedMessages.map((streamedMessage) => {
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
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>
    </div>
  );
}
