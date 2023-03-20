/**
 * @module types/user.d
 *
 *
 * @author montier.elliott@gmail.com
 */
import type { User } from "firebase/auth";
import type { DocumentData, QuerySnapshot } from "firebase/firestore";

/**
 * User
 *
 *
 * @type
 * @typedef {User | null | undefined}
 */
export type AppUser = User | null | undefined;

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
