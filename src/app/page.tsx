import { redirect } from "next/navigation";

export default function Home() {
  // Rediriger vers la langue par défaut gérée par Next (en)
  redirect("/en");
}
