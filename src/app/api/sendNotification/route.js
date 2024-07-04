// src/app/api/sendNotification/route.js

import { NextResponse } from 'next/server';

import { getFirestore } from 'firebase-admin/firestore';
import { admin } from '../../../../lib/firebaseAdmin';

const db = getFirestore();
export async function POST(req) {
  try {
    const { caption } = await req.json();

    const tokensSnapshot = await db.collection('fcmTokens').get();
    if (tokensSnapshot.empty) {
      console.log('No FCM tokens found.');
      return NextResponse.json({ message: 'No FCM tokens found' });
    }

    const tokens = tokensSnapshot.docs.map(doc => doc.data().token);
    const message = {
      notification: {
        title: 'New Post Added',
        body: `A new post was added: ${caption}`,
      },
      tokens: tokens,
    };

    const response = await admin.messaging().sendMulticast(message);
    console.log('Notification sent successfully:', response);
    return NextResponse.json({ message: 'Notification sent successfully', response });
  } catch (error) {
    console.error('Error sending notification:', error);
    return NextResponse.json({ error: 'Error sending notification' });
  }
}