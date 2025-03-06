import type { Message } from "@landbot/core/dist/types";

type MessageKey = string;

export type MessagesRecord = Record<MessageKey, Message>;
