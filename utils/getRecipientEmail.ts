/**
 * @module utils/getRecipientEmail
 *
 *
 * @author montier.elliott@gmail.com
 */
import type { User } from "firebase/auth";

/**
 * Get Recipient Email
 *
 *
 * @function
 * @param {string[]} users
 * @param {User | null | undefined} userLoggedIn
 * @returns {string}
 */
const getRecipientEmail = (
  users: string[],
  userLoggedIn: User | null | undefined
) => {
  const ok = users?.filter(
    (userToFilter: string) => userToFilter !== userLoggedIn?.email
  )[0];
  return ok;
};

/** exporting */
export default getRecipientEmail;
