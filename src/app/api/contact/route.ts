import { NextRequest, NextResponse } from "next/server";
import { getFirestoreDb } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export const runtime = "nodejs";

const COLLECTION_NAME = "carmel_portfolio_contact_messages";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const subject = String(formData.get("subject") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const file = formData.get("file") as File | null;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    let attachmentUrl: string | null = null;

    if (file && file.size > 0) {
      const uploadForm = new FormData();
      uploadForm.set("file", file);
      uploadForm.set("folderPath", "CARMEL_PORTFOLIO/contact");

      const uploadResp = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/upload`,
        {
          method: "POST",
          body: uploadForm,
        }
      );

      if (uploadResp.ok) {
        const json = await uploadResp.json();
        attachmentUrl = json?.data?.secure_url ?? null;
      }
    }

    const db = getFirestoreDb();
    const colRef = collection(db, COLLECTION_NAME);

    await addDoc(colRef, {
      name,
      email,
      subject: subject || null,
      message,
      attachmentUrl,
      status: "unread",
      createdAt: serverTimestamp(),
    });

    const brevoKey = process.env.BREVO_API_KEY;
    const brevoTo = process.env.BREVO_ADMIN_EMAIL;
    if (brevoKey && brevoTo) {
      try {
        await fetch(
          process.env.BREVO_API_URL || "https://api.brevo.com/v3/smtp/email",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "api-key": brevoKey,
            },
            body: JSON.stringify({
              sender: {
                email: process.env.BREVO_API_MAIL || brevoTo,
                name: "Portfolio Jesugnon Carmel AHOTIN",
              },
              to: [{ email: brevoTo }],
              subject:
                subject && subject.length > 0
                  ? `[Portfolio] ${subject}`
                  : `Nouveau message de contact – ${name}`,
              htmlContent: `
              <h1>Nouveau message depuis le portfolio</h1>
              <p><strong>Nom:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              ${
                subject
                  ? `<p><strong>Sujet:</strong> ${subject}</p>`
                  : ""
              }
              <p><strong>Message:</strong></p>
              <p>${message.replace(/\n/g, "<br/>")}</p>
              ${
                attachmentUrl
                  ? `<p><strong>Pièce jointe:</strong> <a href="${attachmentUrl}">${attachmentUrl}</a></p>`
                  : ""
              }
            `,
            }),
          }
        );
      } catch (e) {
        console.error("BREVO_CONTACT_NOTIFICATION_ERROR", e);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("CONTACT_POST_ERROR", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

