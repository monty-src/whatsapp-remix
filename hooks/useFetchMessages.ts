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
  DocumentData,
  QuerySnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

import { auth, db } from "../firebase";
import getRecipientEmail from "../utils/getRecipientEmail";

import type { RecipientDocument } from "../types/user";
import { MessageDocument } from "../types/messages";

interface ChatData {
  id: any;
  users: any;
}

interface MessageData {
  timestamp: any;
  message: string;
  user: string;
  photoURL?: string;
}

interface ChatHook {
  recipient: RecipientDocument;
  recipientEmail: string | undefined;
  messages: MessageDocument[];
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  sendMessage: (e: MouseEvent<HTMLButtonElement>) => Promise<void>;
}

/**
 *
 * @function
 * @param param0
 * @returns
 */
export const useFetchMessages = ({ id, users }: ChatData): ChatHook => {
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
