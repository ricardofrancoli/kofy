type CommonProps = {
  key: string;
  text: string | undefined;
  timestamp: number;
};

export type TextMessage = CommonProps & {
  type: "text";
};

export type ButtonMessage = CommonProps & {
  type: "button";
};

export type DialogMessage = CommonProps & {
  type: "dialog";
  buttons: string[];
  payloads: string[];
};
