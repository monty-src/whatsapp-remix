/**
 * @module types/chat.d
 *
 *
 * @author montier.elliott@gmail.com
 */
import type { User } from "firebase/auth";
import type {
  Query,
  QuerySnapshot,
  DocumentData,
  CollectionReference,
} from "firebase/firestore";

/**
 * User
 *
 * @typedef {User | null | undefined}
 */
export type User = User | null | undefined;

/**
 * Chat
 *
 *
 * @interface
 * @typedef {Object} IChat
 */
export interface IChat {
  id: string;
}

/**
 * Signed In User Chats, user information, and how to create a new chat
 *
 *
 * @interface
 * @typedef {Object} ChatSnapshots
 */
export interface ChatSnapshots {
  user: user;
  chatsSnapshot: QuerySnapshot<DocumentData> | undefined;
  createChat: (input: string) => void;
}

/**
 * Chat Details
 *
 *
 * @interface
 * @typedef {ChatDetails}
 */
export interface ChatDetails {
  id: string;
  users: string[];
}

/**
 * Chat Recipients
 *
 *
 * @interface
 * @typedef {ChatRecipients}
 */
export interface ChatRecipients {
  recipientEmail: string | undefined;
  recipientSnapshot: QuerySnapshot<DocumentData> | undefined;
  enterChat: () => void;
}

/**
 * IMessage
 *
 *
 * @interface
 * @typedef {IMessage}
 */
export interface IMessage {
  id: string;
  timestamp: number;
}

/**
 * Chat Messages Response
 * 
 * 
 * @interface
 * @typedef {ChatMessagesResponse}
 */
export interface ChatMessagesResponse {
  chat: IChat | null;
  messages: Message[];
}