/**
 * @module types/user.d
 *
 *
 * @author montier.elliott@gmail.com
 */
import type { User } from "firebase/auth";
import type { DocumentData, QuerySnapshot, Timestamp } from "firebase/firestore";

/**
 * User
 *
 *
 * @type
 * @typedef {User | null | undefined}
 */
export type AppUser = User | null | undefined;

/**
 * Recipient Document
 *
 *
 * @interface
 * @extends {DocumentData}
 * @typedef {RecipientDocument}
 */
export interface RecipientDocument extends DocumentData {
  email: string;
  photoURL: string;
  lastSeen: Timestamp;
}

/**
 * Recipient
 *
 *
 * @interface
 * @typedef {Recipient}
 */
export interface Recipient {
  user: AppUser;
  recipientSnapshot: QuerySnapshot<DocumentData> | undefined;
  enterChat: () => void;
}
