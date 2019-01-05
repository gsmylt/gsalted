export enum MessageType {
  SUCCESS = 1,
  WARNING = 2,
  ERROR = 3,
  INFO = 4,
}

export interface Toast {
  id: string;
  type: MessageType;
  message: string;
}

export interface RootState {
  toasts: Toast[];
}
