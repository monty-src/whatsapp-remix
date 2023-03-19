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
import { IChat, IMessage, ChatMessagesResponse } from "../types/chat";

import getRecipientEmail from "../utils/getRecipientEmail";

/**
 * Use Fetch Chat
 *
 *
 * @function
 * @param {string} chatId
 * @returns {ChatMessagesResponse}
 */
export const useFetchChat = (chatId: string): ChatMessagesResponse => {
  const [user] = useAuthState(auth);
  const [chat, setChat] = useState<IChat | null>(null);
  const [recipientEmail, setRecipientEmail] = useState<string>("");
  const [messages, setMessages] = useState<IMessage[]>([]);
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
        ...chatResponse.data(),
      });
      setMessages(mappedMessages);
      setRecipientEmail(getRecipientEmail(chat?.users!, user));
    };
    fetchData();
  }, [chatId]);

  return { chat, messages, recipientEmail };
};
