import type { ValidMessageType } from "./constants";

type CommonProps<T extends ValidMessageType> = {
  type: T;
  id: string;
  text: string | undefined;
  timestamp: number;
};

export type TextMessage = CommonProps<"text">;

export type DialogMessage = CommonProps<"dialog"> & {
  buttons: string[];
  payloads: string[];
} & ({ subType: "options" } | { subType: "scale"; scaleTags: [string, string] });

export type FormattedMessage = TextMessage | DialogMessage;
