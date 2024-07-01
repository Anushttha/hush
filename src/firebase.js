import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase app
export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Initialize Firebase Messaging
export const messaging = getMessaging(app);

// Function to request permission and generate/store FCM token
export const generateAndStoreToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      // Retrieve the FCM token
      const currentToken = await getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
      });

      // Initialize Firestore database
      const db = getFirestore(app);

      // Reference to the document in 'fcmTokens' collection
      const tokenRef = doc(db, "fcmTokens", currentToken);

      // Check if the token already exists in Firestore before storing
      const tokenDoc = await getDoc(tokenRef);

      if (!tokenDoc.exists()) {
        // Store the token in Firestore with the token itself as the document ID
        await setDoc(tokenRef, {
          token: currentToken,
          createdAt: new Date(),
        });

        console.log("Token stored successfully:", currentToken);
      } else {
        console.log("Token already exists:", currentToken);
      }
    } else {
      console.log("Permission denied for notifications.");
    }
  } catch (error) {
    console.error("Error storing token:", error);
  }
};
