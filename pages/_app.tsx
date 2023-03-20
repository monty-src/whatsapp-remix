/**
 * @module pages/_app
 *
 *
 * @author montier.elliott@gmail.com
 */
import "../styles/global.css";
import type { AppProps } from "next/app";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import SignIn from "../components/Signin";
import Loading from "../components/Loading";

import { auth } from "../firebase";
import { useFirebaseUserProfile } from "../hooks/useFirebaseUserProfile";

/**
 * NextJS higher-order component, wraps around each page component in application
 *
 *
 * @component
 * @param {AppProps} props
 * @returns {JSX.Element}
 */
function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user) useFirebaseUserProfile(user);
  }, [user]);

  if (loading) return <Loading />;
  if (!user) return <SignIn />;
  return <Component {...pageProps} />;
}

export default MyApp;
