import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import {
  getFirestore,
  type Firestore,
} from "firebase/firestore";
import {
  getAuth,
  type Auth,
} from "firebase/auth";
import {
  getStorage,
  type FirebaseStorage,
} from "firebase/storage";

let app: FirebaseApp | null = null;
let db: Firestore | null = null;
let auth: Auth | null = null;
let storage: FirebaseStorage | null = null;

function getFirebaseApp(): FirebaseApp {
  if (app) return app;

  if (!getApps().length) {
    const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
    const authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
    const messagingSenderId =
      process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID;
    const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID;

    if (
      !apiKey ||
      !authDomain ||
      !projectId ||
      !storageBucket ||
      !messagingSenderId ||
      !appId
    ) {
      throw new Error(
        "Firebase environment variables manquantes. Vérifiez votre fichier .env."
      );
    }

    app = initializeApp({
      apiKey,
      authDomain,
      projectId,
      storageBucket,
      messagingSenderId,
      appId,
    });
  } else {
    app = getApps()[0]!;
  }

  return app!;
}

export function getFirestoreDb(): Firestore {
  if (db) return db;
  const firebaseApp = getFirebaseApp();
  db = getFirestore(firebaseApp);
  return db;
}

export function getFirebaseAuth(): Auth {
  if (auth) return auth;
  const firebaseApp = getFirebaseApp();
  auth = getAuth(firebaseApp);
  return auth;
}

export function getFirebaseStorage(): FirebaseStorage {
  if (storage) return storage;
  const firebaseApp = getFirebaseApp();
  storage = getStorage(firebaseApp);
  return storage;
}

