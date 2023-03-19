import type { AppProps } from "next/app";
import React, { useEffect } from "react";

import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, addDoc, serverTimestamp, setDoc } from "firebase/firestore";

import SignIn from "../components/Signin";

import { db, auth, provider } from "../firebase";

export default function App({ Component, pageProps }: AppProps) {
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    const request = async () => {
      if (user) {
        await setDoc(
          doc(db, "users", user.uid),
          {
            email: user?.email,
            lastSeen: serverTimestamp(),
            photoURL: user?.photoURL,
          },
          { merge: true }
        );
      }
    };

    request();
  }, [user]);

  if (loading)
    return (
      <section>
        <p>loading</p>
      </section>
    );
  if (!user) return <SignIn />;
  return <Component {...pageProps} />;
}
