/**
 * @module components/Sidebar
 *
 *
 * @author montier.elliott@gmail.com
 */
import React from "react";

import styled from "styled-components";

import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import ChatIcon from "@mui/icons-material/Chat";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar, Button, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVertRounded";

import { auth } from "../firebase";
import { useChats } from "../hooks/useChats";

import Chat from "./Chat";

/**
 * Sidebar component
 *
 *
 * @component
 * @returns {JSX.Element}
 */
const Sidebar = (): JSX.Element => {
  const { user, chatsSnapshot, createChat } = useChats();

  /**
   * Handle Sign out
   *
   *
   * @function
   * @returns {Promise<void>}
   */
  const handleSignOut = (): Promise<void> => signOut(auth);

  /**
   * Handle Create
   *
   *
   * @function
   * @returns {void}
   */
  const handleCreate = (): void => {
    const input = prompt(
      "Please enter an email address for the user you with to chat with"
    );
    if (input) createChat(input);
  };

  return (
    <Container>
      <Header>
        <UserAvatar src={user?.photoURL as string} onClick={handleSignOut} />
        <IconsContainer>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </IconsContainer>
      </Header>
      <Search>
        <SearchIcon />
        <SearchInput placeholder="Search in chats" />
      </Search>
      <SidebarButton onClick={handleCreate}>Start a new chat</SidebarButton>
      {chatsSnapshot?.docs.map((chat) => {
        console.log('chat: ', chat);
        console.log('chat: ', chat.data());
        return (
          <Chat key={chat.id} id={chat.id} users={chat.data().users} />
        )
      })}
    </Container>
  );
};

/**
 * Styles
 *
 *
 */
const Container = styled.div``;
const IconsContainer = styled.div``;

const Header = styled.div`
  top: 0;
  z-index: 1;
  position: sticky;

  display: flex;
  align-items: center;
  justify-content: space-between;

  height: 80px;
  padding: 15px;

  background-color: #fff;
  border-bottom: 1px solid #f5f5f5;
`;

const UserAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

const Search = styled.div`
  display: flex;
  align-items: center;

  padding: 5px;
  border-radius: 2px;
`;

const SidebarButton = styled(Button)`
  width: 100%;

  &&& {
    border-top: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
  }
`;

const SearchInput = styled.input`
  flex: 1;

  border: none;
  outline-width: 0;
`;

/** exporting */
export default Sidebar;
