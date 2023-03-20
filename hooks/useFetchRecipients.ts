/**
 * @module utils/useFetchRecipients
 *
 *
 * @author montier.elliott@gmail.com
 */
import { useRouter } from "next/router";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

import { collection, query, where } from "firebase/firestore";

import { auth, db } from "../firebase";
import getRecipientEmail from "../utils/getRecipientEmail";

import type { Chat } from "../types/chat";
import type { Recipient } from "../types/user";

/**
 * Use Fetch Recipients
 *
 *
 * @function
 * @param {Chat}
 * @returns {Recipient}
 */
export const useFetchRecipients = ({ id, users }: Chat): Recipient => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const usersCollection = collection(db, "users");
  const queryUsersCollection = query(
    usersCollection,
    where("email", "==", getRecipientEmail(users, user))
  );

  const [recipientSnapshot] = useCollection(queryUsersCollection);

  /**
   * Enter Chat
   *
   *
   * @function
   * @returns {Promise<boolean>}
   */
  const enterChat = (): Promise<boolean> => router.push(`/chat/${id}`);

  return {
    user,
    recipientSnapshot,
    enterChat,
  };
};
