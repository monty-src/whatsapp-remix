/**
 * @module pages/[id]
 *
 *
 * @author montier.elliott@gmail.com
 */
import Head from "next/head";
import { useRouter } from "next/router";

import styled from "styled-components";

import { useFetchChat } from "../../hooks/useFetchChat";

import Sidebar from "../../components/Sidebar";

/**
 * Chat
 *
 *
 * @returns {JSX.Element}
 */
const Chat = (): JSX.Element => {
  const router = useRouter();
  const { chat, messages, recipientEmail } = useFetchChat(
    router?.query?.id as string
  );

  return (
    <Container>
      <Head>
        <title>Chat with {recipientEmail}</title>
      </Head>
      <Sidebar />
      <ChatContainer>
        <p>testing</p>
      </ChatContainer>
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

const ChatContainer = styled.div`
  flex: 1;
  height: 100vh;

  overflow: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export default Chat;
