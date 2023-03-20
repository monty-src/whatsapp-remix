/**
 * @module types/chat.d
 *
 *
 * @author montier.elliott@gmail.com
 */
import type {
  Query,
  QuerySnapshot,
  DocumentData,
  CollectionReference,
} from "firebase/firestore";

import type { AppUser } from "./user";
import type { Message, Messages } from "./messages";

/**
 * Chat
 *
 *
 * @interface
 * @typedef {Chat}
 */
export interface Chat {
  id: string;
  users: string[];
}

/**
 * Chats
 *
 *
 * @interface
 * @typedef {Chats}
 */
export interface Chats {
  user: AppUser;
  chatsSnapshot: QuerySnapshot<DocumentData> | undefined;
  createChat: (input: string) => void;
}

/**
 * Chat Messages
 * 
 * 
 * @interface
 * @typedef {ChatMessages}
 */
export interface ChatMessages {
  chat: Chat;
  messages: Message[];
  recipientEmail: string;
}