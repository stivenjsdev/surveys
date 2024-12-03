import { redirect } from "next/navigation";

// Home page component / route
export default function Home() {
  // Redirect to the dashboard page
  redirect("/dashboard");
}
