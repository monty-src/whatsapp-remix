# WhatsApp Remix

## Table of Contents

- [Overview](#overview)
- [Technologies](#technologies)
- [Setup](#setup)
- [NPM Build](#npm-build)

## Overview

**Demo** https://monty-src.github.io/whatsapp-remix

This repository is part of the monty-src/remix series, and contains a WhatsApp clone built using Typescript, NextJS, Styled Components and Firebase.

## Technologies

### Typescript

a superset of Javascript that adds optional static typing and other features to the language.

https://www.typescriptlang.org/

### NextJS

a popular React framework for building srver-rendered applications and static websites.

https://nextjs.org/

### Firebase

### @mui/material

### Styled Components

## Setup

### Clone repository

```js
git clone https://github.com/monty-src/whatsapp-remix.git
```

### https://firebase.google.com/

1. **Click** Create a project.
2. **Enter project name** whatsapp-remix
3. **Disable** Google Analytics for your Firebase project
4. **Contine**
5. **Click** Sidebar > Authentication > Sign-in method
6. **Click** Google
7. **Click** Enable
8. **Populate** Project support email
9. **Click** Project Overview > Gear > Project Settings
10. **Click** </> under **Your apps**
11. **App nickname** whatsapp-remix
12. **Click** Register app

Will produce the following artifact.

```js
const firebaseConfig = {
  apiKey: "WHATSAPP_REMIX_FIREBASE_API_KEY",
  authDomain: "WHATSAPP_REMIX_FIREBASE_AUTH_DOMAIN",
  projectId: "WHATSAPP_REMIX_FIREBASE_PROJECT_ID",
  storageBucket: "WHATSAPP_REMIX_FIREBASE_STORAGE_BUCKET",
  messagingSenderId: "WHATSAPP_REMIX_FIREBASE_MESSAGING_SENDER_ID",
  appId: "WHATSAPP_REMIX_FIREBASE_APP_ID",
};
```

### Create .env.local

1. **Change Directory** into whatsapp-remix
2. **Create** .env.local

```bash
WHATSAPP_REMIX_FIREBASE_API_KEY={WHATSAPP_REMIX_FIREBASE_API_KEY}
WHATSAPP_REMIX_FIREBASE_AUTH_DOMAIN={WHATSAPP_REMIX_FIREBASE_AUTH_DOMAIN}
WHATSAPP_REMIX_FIREBASE_PROJECT_ID={WHATSAPP_REMIX_FIREBASE_PROJECT_ID}
WHATSAPP_REMIX_FIREBASE_STORAGE_BUCKET={WHATSAPP_REMIX_FIREBASE_STORAGE_BUCKET}
WHATSAPP_REMIX_FIREBASE_MESSAGING_SENDER_ID={WHATSAPP_REMIX_FIREBASE_MESSAGING_SENDER_ID}
WHATSAPP_REMIX_FIREBASE_APP_ID={WHATSAPP_REMIX_FIREBASE_APP_ID}
```

### Create Database

1. **Go to** https://firebase.google.com/
2. **Click** Create database
3. **Click** Start in production mode
4. **Click** Next
5. **Click** Cloud Firestore location
6. **Click** Enable
7. **Click** Start collection
8. **Populate** users
9. **Click** Next
10. **Click** Auto-ID
11. **Click** Save

### NPM Install

```js
npm i
```

## NPM Build

```js
npm run dev
```
