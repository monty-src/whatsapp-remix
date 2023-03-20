/**
 * @module components/ChatRecipients
 *
 *
 * @author montier.elliott@gmail.com
 */
import styled from "styled-components";
import { Avatar } from "@mui/material";

import type { Chat } from "../types/chat";
import type { RecipientDocument } from "../types/user";

import { useFetchRecipients } from "../hooks/useFetchRecipients";


/**
 * Chat Recipients component
 *
 *
 * @component
 * @param {Props} props
 * @returns {JSX.Element}
 */
const ChatRecipients = ({ id, users }: Chat): JSX.Element => {
  const { recipientSnapshot, enterChat } = useFetchRecipients({
    id,
    users,
  });
  const recipient = recipientSnapshot?.docs?.[0]?.data() as RecipientDocument;

  return (
    <Container onClick={enterChat}>
      {recipient && (
        <>
          <UserAvatar src={recipient?.photoURL} />
          <p>{recipient?.email}</p>
        </>
      )}
    </Container>
  );
};

/**
 * Styles
 *
 *
 */
const Container = styled.div`
  display: flex;
  align-items: center;

  padding: 15px;
  cursor: pointer;
  word-break: break-word;

  :hover {
    background-color: #e9eaeb;
  }
`;

const UserAvatar = styled(Avatar)`
  margin: 5px;
  margin-right: 15px;
`;

/** exporting */
export default ChatRecipients;
