/**
 * @module next.config
 *
 *
 * @author montier.elliott@gmail.com
 */
/** @type {import('next').NextConfig} */

/**
 * Configuration object for the current NextJS application
 *
 *
 * @type {NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  env: {
    apiKey: process.env.WHATSAPP_REMIX_FIREBASE_API_KEY,
    authDomain: process.env.WHATSAPP_REMIX_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.WHATSAPP_REMIX_FIREBASE_PROJECT_ID,
    storageBucket: process.env.WHATSAPP_REMIX_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.WHATSAPP_REMIX_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.WHATSAPP_REMIX_FIREBASE_APP_ID,
  },
  compiler: {
    styledComponents: true
  }
};

/** exporting */
module.exports = nextConfig;
