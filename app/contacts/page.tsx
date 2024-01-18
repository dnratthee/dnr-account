// `app/dashboard/page.tsx` is the UI for the `/dashboard` URL
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "DNR Account :: Contact",
};

export default function Page() {
  return <h1>Hello, Contact Page!</h1>;
}
