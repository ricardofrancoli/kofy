export const ValidMessageType = {
  dialog: "dialog",
  text: "text",
} as const;

export type ValidMessageType = (typeof ValidMessageType)[keyof typeof ValidMessageType];
