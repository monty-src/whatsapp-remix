/**
 * @module components/ChatScreen
 *
 *
 * @author montier.elliott@gmail.com
 */
import { useRouter } from "next/router";
import TimeAgo from "timeago-react";
import styled from "styled-components";
import { IconButton, Avatar } from "@mui/material";
import { InsertEmoticon } from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVertSharp";
import AttachFileIcon from "@mui/icons-material/AttachFileRounded";

import type { Chat } from "../types/chat";
import { useFetchMessages } from "../hooks/useFetchMessages";

import MessageBubble from "./MessageBubble";

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
      <Header>
        {recipient ? (
          <Avatar src={recipient?.photoURL} />
        ) : (
          <Avatar>{recipientEmail}</Avatar>
        )}
        <HeaderInformation>
          <h3>{recipientEmail}</h3>
          {recipient ? (
            <p>
              Last Active:{" "}
              {recipient?.lastSeen?.toDate() ? (
                <TimeAgo datetime={recipient?.lastSeen.toDate()} />
              ) : (
                "Unavailable"
              )}{" "}
            </p>
          ) : (
            <p>Loading Last active...</p>
          )}
        </HeaderInformation>
        <HeaderIcons>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </HeaderIcons>
      </Header>
      <MessageContainer>
        {messages.map((message, key) => (
          <MessageBubble key={key} message={message} />
        ))}
        <EndOfMessage />
      </MessageContainer>
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
    </Container>
  );
};

/**
 * Styles
 *
 *
 */
const Container = styled.div``;

const Header = styled.div`
  top: 0;
  z-index: 100;
  position: sticky;
  display: flex;
  align-items: center;
  padding: 11px;
  height: 80px;
  background-color: #fff;
  border-bottom: 1px solid #f5f5f5;
`;

const HeaderInformation = styled.div`
  flex: 1;
  margin-left: 15px;

  > h3 {
    margin-top: 0;
    margin-bottom: 3px;
  }

  > p {
    margin: 0;
    font-size: 14px;
    color: #808080;
  }
`;

const HeaderIcons = styled.div``;

const MessageContainer = styled.div`
  padding: 30px;
  min-height: 90vh;
  background-color: #e5ded8;
`;

const EndOfMessage = styled.div``;

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
export default ChatScreen;
