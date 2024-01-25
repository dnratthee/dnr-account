import type { Metadata, Viewport } from "next";
import Navbar from "~/components/Navbar";
import "~/styles/globals.scss";
import "../../node_modules/boxicons/css/boxicons.min.css";

export const metadata: Metadata = {
  title: "DNR Account",
  description: "Invoicing and Accounting software",
  generator: "Next.js",
  manifest: "/manifest.webmanifest",
  keywords: ["dnr", "dnratthee", "invoicing", "accounting"],
  authors: [
    { name: "Ratthee Jarathbenjawong" },
    {
      name: "Ratthee Jarathbenjawong",
      url: "https://dnratthee.me/",
    },
  ],
  icons: [
    { rel: "apple-touch-icon", url: "icons/icon-192x192.png" },
    { rel: "icon", url: "icons/icon-192x192.png" },
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* <header>
          <h1>DNR Account</h1>
        </header> */}
        <Navbar />
        <div className="content">{children}</div>
      </body>
    </html>
  );
}
