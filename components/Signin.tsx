/**
 * @module components/Signin
 *
 *
 * @author montier.elliott@gmail.com
 */
import React from "react";

import Head from "next/head";
import Image from "next/image";

import styled from "styled-components";
import Button from "@mui/material/Button";

import { signInWithPopup } from "firebase/auth";
import type { UserCredential } from "firebase/auth";

import Logo from "../public/logo.png";
import { auth, provider } from "../firebase";

/**
 * SignIn component
 *
 *
 * @component
 * @returns {JSX.Element}
 */
const SignIn = (): JSX.Element => {
  const signInGoogleAuth = (): Promise<UserCredential> =>
    signInWithPopup(auth, provider);

  return (
    <Container>
      <Head>
        <title>Sign In</title>
      </Head>
      <SignInContainer>
        <Image priority={true} src={Logo} width={200} height={200} alt="Logo" />
        <SignInButton variant="outlined" onClick={signInGoogleAuth}>
          Sign in with GOOGLE
        </SignInButton>
      </SignInContainer>
    </Container>
  );
};

/**
 * Styles
 *
 *
 */
const Container = styled.div`
  height: 100vh;

  display: grid;
  place-items: center;

  background-color: #f5f5f5;
`;

const SignInContainer = styled.div`
  padding: 100px;

  display: flex;
  flex-direction: column;

  align-items: center;

  row-gap: 30px;

  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.7);
`;

const SignInButton = styled(Button)``;

/** exporting */
export default SignIn;
