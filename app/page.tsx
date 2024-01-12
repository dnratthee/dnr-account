// `app/dashboard/page.tsx` is the UI for the `/dashboard` URL
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "DNR Account",
};

export default function Page() {
  return (
    <div>
      <h1>Hello, Home Page!</h1>
      <Link href="/dashboard">Dashboard</Link>
    </div>
  );
}
