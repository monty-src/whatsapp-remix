/**
 * @module utils/userChat
 *
 *
 * @author montier.elliott@gmail.com
 */
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import type { User } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, query, where } from "firebase/firestore";
import type { QuerySnapshot, DocumentData } from "firebase/firestore";

import { auth, db } from "../firebase";
import getRecipientEmail from "../utils/getRecipientEmail";

/**
 * Chat Data
 *
 *
 * @interface
 * @typedef  {ChatData}
 */
interface ChatData {
  id: string;
  users: string[];
}

/**
 * Chat Hook
 *
 *
 * @interface
 * @typedef {ChatHook}
 */
interface ChatHook {
  recipientEmail: string | undefined;
  recipientSnapshot: QuerySnapshot<DocumentData> | undefined;
  enterChat: () => void;
}

/**
 * useChat
 *
 *
 * @function
 * @param {ChatData}
 * @returns {ChatHook}
 */
export const useChat = ({ id, users }: ChatData): ChatHook => {
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

  const enterChat = () => router.push(`/chat/${id}`);

  return {
    recipientSnapshot,
    recipientEmail,
    enterChat,
  };
};
