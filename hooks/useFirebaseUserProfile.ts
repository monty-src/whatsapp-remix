/**
 * @module hooks/useFirebaseUserProfile
 *
 *
 * @author montier.elliott@gmail.com
 */
import type { User } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

import { db } from "../firebase";

/**
 * @function useFirebaseUserProfile
 *
 *
 * @returns {}
 */
export const useFirebaseUserProfile = (user: User) => {
  /**
   * @function updateUserProfile
   *
   *
   */
  const updateUserProfile = async (user: User | null): Promise<void> => {
    if (!user) return;
    await setDoc(
      doc(db, "users", user.uid),
      {
        email: user.email,
        lastSeen: serverTimestamp(),
        photoURL: user.photoURL,
      },
      { merge: true }
    );
  };

  /** invoking */
  updateUserProfile(user);
};
