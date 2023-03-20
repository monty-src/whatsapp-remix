/**
 * @module components/ChatScreen
 *
 *
 * @author montier.elliott@gmail.com
 */
import styled from "styled-components";

import type { Chat } from "../types/chat";
import { useFetchMessages } from "../hooks/useFetchMessages";

import ChatScreenInput from "./ChatScreenInput";
import ChatScreenHeader from "./ChatScreenHeader";
import ChatScreenMessages from "./ChatScreenMessages";

/**
 * Props
 *
 *
 * @interface
 */
interface Props {
  chat: Chat;
}

/**
 * Chat Screen component
 *
 *
 * @component
 * @param {Props} props
 * @returns {JSX.Element}
 */
const ChatScreen = ({ chat }: Props): JSX.Element => {
  const { recipient, recipientEmail, messages, input, setInput, sendMessage } =
    useFetchMessages({
      users: chat.users,
    });

  return (
    <Container>
      <ChatScreenHeader recipient={recipient} recipientEmail={recipientEmail} />
      <ChatScreenMessages messages={messages} />
      <ChatScreenInput
        input={input}
        setInput={setInput}
        sendMessage={sendMessage}
      />
    </Container>
  );
};

/**
 * Styles
 *
 *
 */
const Container = styled.div``;

/** exporting */
export default ChatScreen;
