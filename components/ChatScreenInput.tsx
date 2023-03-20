/**
 * @module components/ChatScreenInput
 *
 *
 * @author montier.elliott@gmail.com
 */
import styled from "styled-components";
import { InsertEmoticon } from "@mui/icons-material";

import type { Messages } from "../types/messages";

/**
 * Props
 *
 *
 * @interface
 */
type Props = Omit<Messages, "recipient" | "recipientEmail" | "messages">;

/**
 * Chat Screen Input component
 *
 *
 * @component
 * @param {Props} props
 * @returns {JSX.Element}
 */
const ChatScreenInput = ({
  input,
  setInput,
  sendMessage,
}: Props): JSX.Element => {
  return (
    <InputContainer>
      <InsertEmoticon />
      <Input
        value={input}
        onChange={(e: React.FormEvent<HTMLInputElement>) =>
          setInput((e.target as HTMLInputElement).value)
        }
      />
      <button type="submit" onClick={sendMessage}>
        Send Message
      </button>
    </InputContainer>
  );
};

/**
 * Styles
 *
 *
 */
const Input = styled.input`
  flex: 1;
  padding: 20px;
  margin-left: 15px;
  margin-right: 15px;

  outline: 0;
  border: none;
  border-radius: 10px;
  background-color: #f5f5f5;
`;

const InputContainer = styled.form`
  bottom: 0;
  z-index: 100;
  position: sticky;

  display: flex;
  align-items: center;

  padding: 10px;
  background-color: #fff;
`;

/** exporting */
export default ChatScreenInput;
