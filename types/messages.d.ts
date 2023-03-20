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
}
