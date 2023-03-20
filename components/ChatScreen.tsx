/**
 * @module components/ChatScreen
 *
 *
 * @author montier.elliott@gmail.com
 */
import type { MouseEvent } from "react";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";

import TimeAgo from "timeago-react";
import styled from "styled-components";
import { IconButton, Avatar } from "@mui/material";
import { InsertEmoticon } from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVertSharp";
import AttachFileIcon from "@mui/icons-material/AttachFileRounded";

import { auth } from "../firebase";
import type { Chat } from "../types/chat";
import { useFetchMessages } from "../hooks/useFetchMessages";

import MessageBubble from "./MessageBubble";

interface Props {
  chat: Chat;
}

/**
 * Chat Screen
 *
 *
 * @component
 * @param {Props} props
 * @returns {JSX.Element}
 */
const ChatScreen = ({ chat }: Props): JSX.Element => {
  const router = useRouter();
  const { recipient, recipientEmail, messages, input, setInput, sendMessage } =
    useFetchMessages({
      users: chat.users,
      id: router.query.id,
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
  position: sticky;
  background-color: white;
  z-index: 100;
  top: 0;
  display: flex;
  padding: 11px;
  height: 80px;
  align-items: center;
  border-bottom: 1px solid whitesmoke;
`;

const HeaderInformation = styled.div`
  margin-left: 15px;
  flex: 1;

  > h3 {
    margin-bottom: 3px;
  }

  > p {
    font-size: 14px;
    color: gray;
  }
`;

const HeaderIcons = styled.div``;

const MessageContainer = styled.div`
  padding: 30px;
  background-color: #e5ded8;
  min-height: 90vh;
`;

const EndOfMessage = styled.div``;

const Input = styled.input`
  flex: 1;
  outline: 0;
  border: none;
  border-radius: 10px;
  background-color: whitesmoke;
  padding: 20px;
  margin-left: 15px;
  margin-right: 15px;
`;

const InputContainer = styled.form`
  display: flex;
  align-items: center;
  padding: 10px;
  position: sticky;
  bottom: 0;
  background-color: white;
  z-index: 100;
`;

/** exporting */
export default ChatScreen;
