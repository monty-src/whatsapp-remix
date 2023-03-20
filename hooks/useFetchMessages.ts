/**
 * @module hooks/useFetchMessages
 *
 *
 * @author montier.elliott@gmail.com
 */
import { MouseEvent, useState } from "react";
import { useRouter } from "next/router";
import {
  doc,
  addDoc,
  setDoc,
  query,
  orderBy,
  where,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

import { auth, db } from "../firebase";
import getRecipientEmail from "../utils/getRecipientEmail";

import type { Chat } from "../types/chat";
import type { RecipientDocument } from "../types/user";
import type { Messages, MessageDocument } from "../types/messages";

/**
 * Use Fetch Messages
 *
 *
 * @function
 * @param {Chat}
 * @returns {Messages}
 */
export const useFetchMessages = ({ users }: Chat): Messages => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [input, setInput] = useState<string>("");
  const messagesCollection = collection(
    db,
    `chats/${router.query.id}/messages`
  );
  const usersCollection = collection(db, "users");
  const queryMessagesCollection = query(
    messagesCollection,
    orderBy("timestamp", "asc")
  );
  const queryUsersCollection = query(
    usersCollection,
    where("email", "==", getRecipientEmail(users, user))
  );
  const [recipientSnapshot] = useCollection(queryUsersCollection);
  const [messagesSnapshot] = useCollection(queryMessagesCollection);

  const recipient = recipientSnapshot?.docs?.[0]?.data() as RecipientDocument;
  const recipientEmail = getRecipientEmail(users, user);

  const sendMessage = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await setDoc(
      doc(db, `users/${user?.uid}`),
      { lastSeen: serverTimestamp() },
      { merge: true }
    );
    const messagesCollection = collection(
      db,
      `chats/${router.query.id}/messages`
    );
    await addDoc(messagesCollection, {
      timestamp: serverTimestamp(),
      message: input,
      user: user?.email,
      photoURL: user?.photoURL,
    });
    setInput("");
  };

  const messages =
    messagesSnapshot?.docs?.map(
      (doc) => ({ id: doc.id, ...doc.data() } as MessageDocument)
    ) ?? [];

  return {
    recipient,
    recipientEmail,
    messages,
    input,
    setInput,
    sendMessage,
  };
};
