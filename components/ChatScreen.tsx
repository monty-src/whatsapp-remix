/**
 * @module components/ChatScreen
 *
 *
 * @author montier.elliott@gmail.com
 */
import { useRouter } from "next/router";
import styled from "styled-components";
import { Avatar } from "@mui/material";
import { useFetchMessages } from "../hooks/useFetchMessages";
import { Chat, ChatMessages } from "../types/chat";

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

  return <Container></Container>;
};

/**
 * Styles
 *
 *
 */
const Container = styled.div``;

/** exporting */
export default ChatScreen;
