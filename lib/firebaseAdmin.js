// src/lib/firebaseAdmin.js
import admin from "firebase-admin";

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://hush-df0a6-default-rtdb.asia-southeast1.firebasedatabase.app"
  });
  console.log("Firebase Admin SDK initialized.");
}

const db = admin.firestore();

export { admin, db };
