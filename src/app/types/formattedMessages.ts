import type { ValidMessageType } from "./constants";

type CommonProps<T extends ValidMessageType> = {
  type: T;
  key: string;
  text: string | undefined;
  timestamp: number;
};

export type TextMessage = CommonProps<"text">;

export type DialogMessage = CommonProps<"dialog"> & {
  buttons: string[];
  payloads: string[];
};

export type FormattedMessage = TextMessage | DialogMessage;
