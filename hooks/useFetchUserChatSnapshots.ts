/**
 * @module hooks/useFetchUserChatSnapshots
 *
 *
 * @author montier.elliott@gmail.com
 */
import EmailValidator from "email-validator";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

import { collection, query, where, addDoc } from "firebase/firestore";

import { auth, db } from "../firebase";

import type { Chats } from "../types/chat";

/**
 * Use Fetch User Chats
 *
 *
 * @function
 * @returns {Chats}
 */
export const useFetchUserChatSnapshots = (): Chats => {
  const [user] = useAuthState(auth);
  const chatsCollection = collection(db, "chats");
  const userChatRef = query(
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
