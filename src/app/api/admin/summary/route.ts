import { NextRequest, NextResponse } from "next/server";
import { getFirestoreDb } from "@/lib/firebase";
import { collection, getCountFromServer } from "firebase/firestore";

export const runtime = "nodejs";

export async function GET(_req: NextRequest) {
  try {
    const db = getFirestoreDb();

    const newsletterCol = collection(db, "batigrinforj_newsletter");
    const contactCol = collection(db, "batigrinforj_contact_messages");
    const visitsCol = collection(db, "batigrinforj_visits");

    const [newsletterSnap, contactSnap, visitsSnap] = await Promise.all([
      getCountFromServer(newsletterCol),
      getCountFromServer(contactCol),
      getCountFromServer(visitsCol).catch(() => null),
    ]);

    return NextResponse.json({
      newsletterCount: newsletterSnap.data().count,
      contactCount: contactSnap.data().count,
      visitsCount: visitsSnap ? visitsSnap.data().count : 0,
    });
  } catch (error) {
    console.error("ADMIN_SUMMARY_ERROR", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

