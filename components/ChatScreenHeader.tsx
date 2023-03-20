/**
 * @module components/ChatScreenHeader
 *
 *
 * @author montier.elliott@gmail.com
 */
import TimeAgo from "timeago-react";
import styled from "styled-components";
import { IconButton, Avatar } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVertSharp";
import AttachFileIcon from "@mui/icons-material/AttachFileRounded";

import type { RecipientDocument } from "../types/user";

/**
 * Props
 *
 *
 * @interface
 */
interface Props {
  recipient: RecipientDocument;
  recipientEmail: string | undefined;
}

/**
 * Chat Screen Header component
 *
 *
 * @component
 * @param {Props} props
 * @returns {JSX.Element}
 */
const ChatScreenHeader = ({
  recipient,
  recipientEmail,
}: Props): JSX.Element => {
  return (
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
  );
};

/**
 * Styles
 *
 *
 */
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

/** exporting */
export default ChatScreenHeader;
