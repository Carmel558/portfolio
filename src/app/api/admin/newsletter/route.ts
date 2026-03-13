import { NextRequest, NextResponse } from "next/server";
import { getFirestoreDb } from "@/lib/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

export const runtime = "nodejs";

export async function GET(_req: NextRequest) {
  try {
    const db = getFirestoreDb();
    const colRef = collection(db, "batigrinforj_newsletter");
    const q = query(colRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);

    const items = snapshot.docs.map((doc) => {
      const data = doc.data() as any;
      return {
        id: doc.id,
        email: data.email,
        createdAt: data.createdAt?.toDate?.().toISOString?.() ?? null,
      };
    });

    return NextResponse.json({ items });
  } catch (error) {
    console.error("ADMIN_NEWSLETTER_GET_ERROR", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

