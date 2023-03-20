/**
 * @module types/messages.d
 *
 *
 * @author montier.elliott@gmail.com
 */
import type { Recipient } from "./user";
import type { DocumentData, Timestamp } from "firebase/firestore";

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
export interface Messages {}
