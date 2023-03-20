/**
 * @module types/messages.d
 *
 *
 * @author montier.elliott@gmail.com
 */
import type { Recipient } from "./user";

/**
 * Message
 *
 *
 * @interface
 * @typedef {Message}
 */
export interface Message {
  id: string;
  input?: string;
  timestamp: number | string;
}

/**
 * Messages
 *
 *
 * @interface
 * @typedef {Messages}
 */
export interface Messages {
  messages: Message[];

  user: User;
  recipient: Recipient;

  setInput: React.Dispatch<React.SetStateAction<string>>;
  sendMessage: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}
