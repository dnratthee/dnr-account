import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "DNR Account :: Home",
};

export default function Page() {
  return (
    <div className="page A4">
      <h1>Hello, Home Page !!!</h1>
      <Link href="/dashboard">Dashboard</Link>
    </div>
  );
}
