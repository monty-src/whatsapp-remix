/**
 * @module types/messages.d
 *
 *
 * @author montier.elliott@gmail.com
 */

interface Message {}

interface Messages {
  recipient: any;
  recipientEmail: string | undefined;
  messages: any;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  sendMessage: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}