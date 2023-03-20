/**
 * @module hooks/useFetchChat
 *
 *
 * @author montier.elliott@gmail.com
 */
import { useState, useEffect } from "react";
import {
  doc,
  getDoc,
  query,
  orderBy,
  collection,
  getDocs,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth, db } from "../firebase";
import getRecipientEmail from "../utils/getRecipientEmail";

import type { Message } from "../types/messages";
import type { Chat, ChatMessages } from "../types/chat";

/**
 * Use Fetch Chat
 *
 *
 * @function
 * @param {string} chatId
 * @returns {ChatMessages}
 */
export const useFetchChat = (chatId: string): ChatMessages => {
  const [user] = useAuthState(auth);
  const [chat, setChat] = useState<Chat>({ id: "", users: [] });
  const [recipientEmail, setRecipientEmail] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const chatsRef = doc(db, `chats/${chatId}`);
  const messagesCollection = collection(db, `chats/${chatId}/messages`);
  const queryMessagesCollection = query(
    messagesCollection,
    orderBy("timestamp", "asc")
  );

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const chatResponse = await getDoc(chatsRef);
      const messagesResponse = await getDocs(queryMessagesCollection);
      const mappedMessages = messagesResponse.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp.toDate().getTime(),
      }));
      setChat({
        id: chatResponse.id,
        users: chatResponse.data()?.users,
      });
      setMessages(mappedMessages);
      setRecipientEmail(getRecipientEmail(chat?.users!, user));
    };
    fetchData();
  }, [chatId]);

  return { chat, messages, recipientEmail };
};
