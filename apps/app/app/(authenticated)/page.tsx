import { redirect } from "next/navigation";

// Redirect root to links dashboard
export default function HomePage() {
  redirect("/links");
}
