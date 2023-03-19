import type { AppProps } from "next/app";
import React, { useEffect } from "react";

import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import SignIn from "../components/Signin";

import { auth } from "../firebase";
import { useFirebaseUserProfile } from "../hooks/useFirebaseUserProfile";

export default function App({ Component, pageProps }: AppProps) {
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user) useFirebaseUserProfile(user);
  }, [user]);

  setTimeout(() => {
    signOut(auth);
  }, 10000);

  if (loading)
    return (
      <section>
        <p>loading</p>
      </section>
    );
  if (!user) return <SignIn />;
  return <Component {...pageProps} />;
}
