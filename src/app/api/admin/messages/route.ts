import { NextRequest, NextResponse } from "next/server";
import { getFirestoreDb } from "@/lib/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

export const runtime = "nodejs";

const COLLECTION_NAME = "carmel_portfolio_contact_messages";

export async function GET(_req: NextRequest) {
  try {
    const db = getFirestoreDb();
    const colRef = collection(db, COLLECTION_NAME);
    const q = query(colRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);

    const items = snapshot.docs.map((doc) => {
      const data = doc.data() as any;
      return {
        id: doc.id,
        name: data.name,
        email: data.email,
        message: data.message,
        attachmentUrl: data.attachmentUrl ?? null,
        status: data.status ?? "unread",
        createdAt: data.createdAt?.toDate?.().toISOString?.() ?? null,
      };
    });

    return NextResponse.json({ items });
  } catch (error) {
    console.error("ADMIN_MESSAGES_GET_ERROR", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

