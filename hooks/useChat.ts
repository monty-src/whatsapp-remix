/**
 * @module utils/userChat
 *
 *
 * @author montier.elliott@gmail.com
 */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

import { collection, query, where } from "firebase/firestore";

import { auth, db } from "../firebase";
import getRecipientEmail from "../utils/getRecipientEmail";

import type { ChatDetails, ChatRecipients } from "../types/chat";

/**
 * Hook Use Chat
 *
 *
 * @function
 * @param {ChatDetails}
 * @returns {ChatRecipients}
 */
export const useChat = ({ id, users }: ChatDetails): ChatRecipients => {
  const router = useRouter();
  const [user] = useAuthState(auth);

  const usersCollection = collection(db, "users");
  const queryUsersCollection = query(
    usersCollection,
    where("email", "==", getRecipientEmail(users, user))
  );

  const [recipientSnapshot] = useCollection(queryUsersCollection);
  const [recipientEmail, setRecipientEmail] = useState<string>();

  useEffect(
    () => setRecipientEmail(getRecipientEmail(users, user)),
    [users, user]
  );

  /**
   * Enter Chat
   *
   * 
   * @function
   * @returns {Promise<boolean>}
   */
  const enterChat = (): Promise<boolean> => router.push(`/chat/${id}`);

  return {
    recipientSnapshot,
    recipientEmail,
    enterChat,
  };
};
