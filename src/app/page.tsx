"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CoffeeChoices } from "./components/CoffeeChoices";
import { DialogMessage } from "./components/DialogMessage/DialogMessage";
import { TextMessage } from "./components/TextMessage";
import { useLandbotMessages } from "./hooks/useLandbotMessages";
import { useStreamedMessages } from "./hooks/useStreamedMessages";
import { useUserChoices } from "./hooks/useUserChoices";
import { ValidMessageType } from "./types";

export default function Home() {
  const { error, isLoading, messages, sendMessage } = useLandbotMessages();
  const { streamedMessages } = useStreamedMessages(messages);
  const { finalCoffeeChoices, addChoice } = useUserChoices();
  const [shouldShowChoices, setShouldShowChoices] = useState(false);
  const [isChoicesVisible, setIsChoicesVisible] = useState(false);

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

  useEffect(() => {
    if (shouldShowChoices && !isChoicesVisible) {
      // Small delay to ensure DOM is updated before animation starts
      const visibilityTimer = setTimeout(() => {
        setIsChoicesVisible(true);
      }, 50);

      return () => clearTimeout(visibilityTimer);
    }
  }, [shouldShowChoices, isChoicesVisible]);

  useEffect(() => {
    if (shouldShowChoices && isChoicesVisible) {
      // Small delay to ensure the DOM is fully updated with the new content
      const scrollTimer = setTimeout(() => {
        scrollToBottom();
      }, 100);

      return () => clearTimeout(scrollTimer);
    }
  }, [isChoicesVisible, shouldShowChoices, scrollToBottom]);

  const onButtonClick = async (selectedPayload: string, payloads: string[], isWelcome: boolean) => {
    sendMessage({ payload: selectedPayload });

    if (finalCoffeeChoices) {
      setShouldShowChoices(true);
      return;
    }

    if (!isWelcome) {
      addChoice(selectedPayload, payloads);
    }
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
                  <DialogMessage
                    {...streamedMessage}
                    onButtonClick={(payload) =>
                      onButtonClick(payload, streamedMessage.payloads, streamedMessage.isWelcome)
                    }
                  />
                </div>
              );
            })}

            {finalCoffeeChoices && isChoicesVisible && (
              <div
                className={`transition-all duration-500 ease-in-out mt-4 pt-4
                  ${
                    isChoicesVisible
                      ? "opacity-100 max-h-96 transform translate-y-0"
                      : "opacity-0 max-h-0 transform translate-y-10 overflow-hidden"
                  }`}
              >
                <h3 className="text-center font-bold text-mocha mb-2">Your Coffee Selection</h3>
                <CoffeeChoices coffeeChoices={finalCoffeeChoices} />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>
    </div>
  );
}
