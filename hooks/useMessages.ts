/**
 * @module hooks/useMessages
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

import { db } from "../firebase";
import { IChat, IMessage, ChatMessagesResponse } from "../types/chat";

/**
 * Use Messages
 *
 *
 * @function
 * @param {string} chatId
 * @returns {ChatMessagesResponse}
 */
export const useMessages = (chatId: string): ChatMessagesResponse => {
  const [chat, setChat] = useState<IChat | null>(null);
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
        ...(doc.data() as Omit<IMessage, "id" | "timestamp">),
        timestamp: doc.data().timestamp.toDate().getTime(),
      }));
      setChat({
        id: chatResponse.id,
        ...(chatResponse.data() as Omit<IChat, "id">),
      });
      setMessages(mappedMessages);
    };
    fetchData();
  }, [chatId]);

  return { chat, messages };
};
