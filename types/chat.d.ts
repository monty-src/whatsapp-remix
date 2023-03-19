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
