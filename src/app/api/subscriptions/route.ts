import { NextResponse } from 'next/server';
import { getFirestoreDb } from '@/lib/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      nom,
      email,
      whatsapp,
      age,
      genre,
      objectif,
      informations,
      offer,
      paymentMethod,
      paymentStatus,
      subscriptionStatus,
      transactionId,
    } = body;

    if (!nom || !email || !whatsapp || !age || !genre || !objectif || !offer) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create subscription document
    const db = getFirestoreDb();

    const subscriptionData = {
      nom,
      email,
      whatsapp,
      age,
      genre,
      objectif,
      informations: informations || '',
      offer,
      paymentMethod,
      paymentStatus: paymentStatus || 'pending',
      subscriptionStatus: subscriptionStatus || 'active',
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    } as any;

    // Store only transaction ID (fetch full details on demand from FedaPay)
    if (transactionId) {
      subscriptionData.transactionId = transactionId;
    }

    const subscriptionsCollection = collection(db, 'earlyAccessSubscriptions');
    const docRef = await addDoc(subscriptionsCollection, subscriptionData);

    return NextResponse.json(
      {
        success: true,
        message: 'Subscription created successfully',
        data: { id: docRef.id, ...subscriptionData },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('SUBSCRIPTION_POST_ERROR', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { error: 'Email parameter required' },
        { status: 400 }
      );
    }

    const db = getFirestoreDb();
    const subscriptionsCollection = collection(db, 'earlyAccessSubscriptions');
    // Note: You'll need to set up proper firestore query
    // This is a placeholder - you should use proper query methods

    return NextResponse.json({ success: true, data: [] });
  } catch (error) {
    console.error('SUBSCRIPTION_GET_ERROR', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
