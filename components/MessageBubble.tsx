/**
 * @module components/MessageBubble
 *
 *
 * @author montier.elliott@gmail.com
 */
import React from "react";
import styled from "styled-components";

import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "../firebase";

/**
 * Props
 *
 *
 * @interface
 * @returns {JSX.Element}
 */
interface Props {
  message: {
    user: string;
    message: string;
  };
}

/**
 * Message Bubble component
 *
 *
 * @component
 * @param {Props}
 * @returns {JSX.Element}
 */
const MessageBubble = ({ message }: Props): JSX.Element => {
  const [userLoggedIn] = useAuthState(auth);
  const TypeOfMessage =
    message.user === userLoggedIn?.email ? Sender : Reciever;
  return (
    <Container>
      <TypeOfMessage>{message.message}</TypeOfMessage>
    </Container>
  );
};

/**
 * Styles
 *
 *
 */
const Container = styled.div``;

const MessageElement = styled.p`
  position: relative;

  margin: 10px;
  padding: 15px;
  padding-bottom: 26px;

  min-width: 60px;
  width: fit-content;
  border-radius: 8px;

  text-align: right;
`;

const Sender = styled(MessageElement)`
  margin-left: auto;
  background-color: #dcf8c6;
`;

const Reciever = styled(MessageElement)`
  background-color: #f5f5f5;
  text-align: left;
`;

export default MessageBubble;
