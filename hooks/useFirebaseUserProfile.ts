/**
 * @module hooks/useFirebaseUserProfile
 *
 *
 * @author montier.elliott@gmail.com
 */
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

import { db } from "../firebase";
import type { AppUser } from "../types/user";

/**
 * Hook Use Firebase User Profile
 *
 *
 * @function
 * @param {User} user
 * @returns {void}
 */
export const useFirebaseUserProfile = (user: AppUser): void => {
  /**
   * Update User Profile
   *
   *
   * @function
   * @param {AppUser} user
   * @returns {Promise<void>}
   */
  const updateUserProfile = async (user: AppUser): Promise<void> => {
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
