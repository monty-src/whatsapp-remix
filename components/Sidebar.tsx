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
import { Avatar, Button, IconButton } from "@mui/material";

import { auth } from "../firebase";

/**
 * Sidebar component
 *
 *
 * @component
 * @returns {JSX.Element}
 */
const Sidebar = (): JSX.Element => {
  const [user] = useAuthState(auth);
  const signUserOut = () => signOut(auth);

  return (
    <Container>
      <Header>
        <UserAvatar src={user?.photoURL as string} onClick={signUserOut} />
      </Header>
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

/** exporting */
export default Sidebar;
