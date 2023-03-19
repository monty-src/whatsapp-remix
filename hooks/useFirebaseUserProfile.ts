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
 * @returns {void}
 */
export const useFirebaseUserProfile = (user: User): void => {
  /**
   * @function updateUserProfile
   *
   *
   * @param {User} user
   * @returns {Promise<void>}
   */
  const updateUserProfile = async (user: User | null): Promise<void> => {
    if (!user) return;
    try {
      await setDoc(
        doc(db, "users", user.uid),
        {
          email: user.email,
          lastSeen: serverTimestamp(),
          photoURL: user.photoURL,
        },
        { merge: true }
      );
    } catch (e) {}
  };

  /** invoking */
  updateUserProfile(user);
};
