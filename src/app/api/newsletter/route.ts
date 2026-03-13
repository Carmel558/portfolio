import { NextRequest, NextResponse } from "next/server";
import { getFirestoreDb } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, getCountFromServer } from "firebase/firestore";

export const runtime = "nodejs";

const COLLECTION_NAME = "batigrinforj_newsletter";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = (body?.email as string | undefined)?.trim().toLowerCase();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const db = getFirestoreDb();
    const colRef = collection(db, COLLECTION_NAME);

    await addDoc(colRef, {
      email,
      createdAt: serverTimestamp(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("NEWSLETTER_POST_ERROR", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const count = searchParams.get("count");

    if (count === "true") {
      const db = getFirestoreDb();
      const colRef = collection(db, COLLECTION_NAME);
      const snapshot = await getCountFromServer(colRef);
      return NextResponse.json({ count: snapshot.data().count });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("NEWSLETTER_GET_ERROR", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

