/**
 * @module pages/[id]
 *
 *
 * @author montier.elliott@gmail.com
 */
import type { NextPage } from "next";
import { useRouter } from "next/router";
import styled from "styled-components";

import { useMessages } from "../../hooks/useMessages";

/**
 * Chat
 *
 *
 * @returns {JSX.Element}
 */
const Chat = (): JSX.Element => {
  const router = useRouter();
  const { chat, messages } = useMessages(router?.query?.id as string);
  console.log("chat: ", chat);
  console.log("messages: ", messages);

  return (
    <Container>
      <p>testing</p>
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
`;

export default Chat;
