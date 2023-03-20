/**
 * @module types/messages.d
 *
 *
 * @author montier.elliott@gmail.com
 */
import type { MouseEvent, Dispatch, SetStateAction } from "react";
import type { DocumentData, Timestamp } from "firebase/firestore";
import type { Recipient, RecipientDocument, } from "./user";

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
 * Message Document
 *
 *
 * @interface
 * @typedef {MessageDocument}
 */
export interface MessageDocument extends DocumentData {
  id: string;
  user: string;

  message: string;
  photoURL: string;
  timestamp: Timestamp;
}

/**
 * Messages
 *
 *
 * @interface
 * @typedef {Messages}
 */
export interface Messages {
  recipient: RecipientDocument;
  recipientEmail: string | undefined;
  messages: MessageDocument[];
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  sendMessage: (e: MouseEvent<HTMLButtonElement>) => Promise<void>;
}
