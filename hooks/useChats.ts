/**
 * @module hooks/useChats
 *
 *
 * @author montier.elliott@gmail.com
 */
import EmailValidator from "email-validator";

import type { User } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import {
  collection,
  query,
  where,
  addDoc,
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore";
import type { Query, CollectionReference } from "firebase/firestore";

import { auth, db } from "../firebase";

/**
 * Chats Hooks interface
 *
 *
 * @interface
 * @typedef {Object} UserChats
 */
interface UseChats {
  user: User | null | undefined;
  chatsSnapshot: QuerySnapshot<DocumentData> | undefined;
  createChat: (input: string) => void;
}

/**
 * Hook Use Chats
 *
 *
 * @function
 * @returns {UseChats}
 */
export const useChats = (): UseChats => {
  const [user] = useAuthState(auth);
  const chatsCollection: CollectionReference<DocumentData> = collection(
    db,
    "chats"
  );
  const userChatRef: Query<DocumentData> = query(
    chatsCollection,
    where("users", "array-contains", user?.email)
  );
  const [chatsSnapshot] = useCollection(userChatRef);

  /**
   * Create Chat
   *
   *
   * @function
   * @param {string} input
   * @returns {void}
   */
  const createChat = (input: string): void => {
    if (
      !input ||
      !EmailValidator.validate(input) ||
      chatAlreadyExist(input) ||
      input === user?.email
    ) {
      return;
    }
    addDoc(collection(db, "chats"), {
      users: [user?.email, input],
    });
  };

  /**
   * Chat already exist
   *
   *
   * @function
   * @param recipientEmail
   * @returns {boolean}
   */
  const chatAlreadyExist = (recipientEmail: string): boolean => {
    return !!chatsSnapshot?.docs.find(
      (chat) =>
        chat.data().users.find((user: string) => user === recipientEmail)
          ?.length > 0
    );
  };

  return {
    user,
    chatsSnapshot,
    createChat,
  };
};
