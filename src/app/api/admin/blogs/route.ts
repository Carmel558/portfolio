import { NextRequest, NextResponse } from "next/server";
import { getFirestoreDb } from "@/lib/firebase";
import {
  collection,
  getDocs,
  orderBy,
  query,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export const runtime = "nodejs";

const COLLECTION_NAME = "carmel_portfolio_blog_posts";

export async function GET(_request: NextRequest) {
  try {
    const db = getFirestoreDb();
    const colRef = collection(db, COLLECTION_NAME);
    const q = query(colRef, orderBy("createdAt", "desc"));
    const snap = await getDocs(q);

    const items = snap.docs.map((d) => {
      const data = d.data() as any;
      return {
        id: d.id,
        title: data.title,
        content: data.content,
        authorName: data.authorName,
        authorEmail: data.authorEmail,
        status: data.status,
        createdAt: data.createdAt?.toDate?.().toISOString?.() ?? null,
      };
    });

    return NextResponse.json({ items });
  } catch (error: any) {
    console.error("ADMIN_BLOGS_GET_ERROR", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const id = String(body.id || "").trim();
    const status = String(body.status || "").trim();

    if (!id || !status) {
      return NextResponse.json(
        { error: "Missing id or status" },
        { status: 400 }
      );
    }

    const db = getFirestoreDb();
    const ref = doc(db, COLLECTION_NAME, id);
    await updateDoc(ref, { status });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("ADMIN_BLOGS_PATCH_ERROR", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = String(searchParams.get("id") || "").trim();

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    const db = getFirestoreDb();
    const ref = doc(db, COLLECTION_NAME, id);
    await deleteDoc(ref);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error?.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("ADMIN_BLOGS_DELETE_ERROR", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

