import { NextRequest, NextResponse } from "next/server";
import { getFirestoreDb } from "@/lib/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
  where,
  orderBy,
} from "firebase/firestore";

export const runtime = "nodejs";

const COLLECTION_NAME = "carmel_portfolio_blog_posts";

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type") || "";

    let name = "";
    let email = "";
    let title = "";
    let content = "";

    if (contentType.includes("application/json")) {
      const body = await request.json();
      name = String(body.name || "").trim();
      email = String(body.email || "").trim();
      title = String(body.title || "").trim();
      content = String(body.content || "").trim();
    } else {
      const formData = await request.formData();
      name = String(formData.get("name") || "").trim();
      email = String(formData.get("email") || "").trim();
      title = String(formData.get("title") || "").trim();
      content = String(formData.get("content") || "").trim();
    }

    if (!name || !email || !title || !content) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const db = getFirestoreDb();
    const colRef = collection(db, COLLECTION_NAME);

    await addDoc(colRef, {
      authorName: name,
      authorEmail: email,
      title,
      content,
      status: "pending",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("BLOGS_POST_ERROR", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || "published";

    const db = getFirestoreDb();
    const colRef = collection(db, COLLECTION_NAME);
    const q = query(
      colRef,
      where("status", "==", status),
      orderBy("createdAt", "desc")
    );
    const snap = await getDocs(q);

    const items = snap.docs.map((doc) => {
      const data = doc.data() as any;
      return {
        id: doc.id,
        title: data.title,
        content: data.content,
        authorName: data.authorName,
        createdAt: data.createdAt?.toDate?.().toISOString?.() ?? null,
      };
    });

    return NextResponse.json({ items });
  } catch (error) {
    console.error("BLOGS_GET_ERROR", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

