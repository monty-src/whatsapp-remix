/**
 * @module utils/getRecipientEmail
 *
 *
 * @author montier.elliott@gmail.com
 */
import type { AppUser } from "../types/user";

/**
 * Get Recipient Email
 *
 *
 * @function
 * @param {string[]} users
 * @param {User | null | undefined} userLoggedIn
 * @returns {string}
 */
const getRecipientEmail = (users: string[], userLoggedIn: AppUser) => {
  const ok = users?.filter(
    (userToFilter: string) => userToFilter !== userLoggedIn?.email
  )[0];
  return ok;
};

/** exporting */
export default getRecipientEmail;
