/**
 * @module pages/_app
 *
 *
 * @author montier.elliott@gmail.com
 */
import type { AppProps } from "next/app";
import React, { useEffect } from "react";

import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import SignIn from "../components/Signin";
import Loading from "../components/Loading";

import { auth } from "../firebase";

import { useFirebaseUserProfile } from "../hooks/useFirebaseUserProfile";

/**
 * NextJS higher-order component, wraps around each page component in application
 *
 *
 * @param {AppProps} props
 * @returns {JSX.Element}
 */
function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user) useFirebaseUserProfile(user);
  }, [user]);

  setTimeout(() => {
    signOut(auth);
  }, 5000);

  if (loading) return <Loading />;
  if (!user) return <SignIn />;
  return <Component {...pageProps} />;
}

export default MyApp;
