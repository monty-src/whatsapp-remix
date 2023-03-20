/**
 * @module components/ChatScreenMessages
 *
 *
 * @author montier.elliott@gmail.com
 */
import styled from "styled-components";
import MessageBubble from "./MessageBubble";

import type { MessageDocument } from "../types/messages";

/**
 * Props
 *
 *
 * @interface
 */
interface Props {
  messages: MessageDocument[];
}

/**
 * Chat Screen Header component
 *
 *
 * @component
 * @param {Props} props
 * @returns {JSX.Element}
 */
const ChatScreenMessages = ({ messages }: Props): JSX.Element => {
  return (
    <MessageContainer>
      {messages.map((message, key) => (
        <MessageBubble key={key} message={message} />
      ))}
      <EndOfMessage />
    </MessageContainer>
  );
};

/**
 * Styles
 *
 *
 */
const MessageContainer = styled.div`
  padding: 30px;
  min-height: 90vh;
  background-color: #e5ded8;
`;

const EndOfMessage = styled.div``;

/** exporting */
export default ChatScreenMessages;
