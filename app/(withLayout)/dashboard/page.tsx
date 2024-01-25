// `app/dashboard/page.tsx` is the UI for the `/dashboard` URL
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "DNR Account :: Dashboard",
};

export default function Page() {
  return <h1>Hello, Dashboard Page!</h1>;
}
