import type { Metadata, Viewport } from "next";
import Navbar from "~/components/Navbar";
import "~/styles/globals.scss";
import "../../node_modules/boxicons/css/boxicons.css";

export const metadata: Metadata = {
  title: "DNR Account",
  description: "Invoicing and Accounting software",
  generator: "Next.js",
  // manifest: "/manifest.webmanifest",
  keywords: ["dnr", "dnratthee", "invoicing", "accounting"],
  authors: [
    { name: "Ratthee Jarathbenjawong" },
    {
      name: "Ratthee Jarathbenjawong",
      url: "https://dnratthee.me/",
    },
  ],
  // icons: [
  //   { rel: "apple-touch-icon", url: "icons/icon-192x192.png" },
  //   { rel: "icon", url: "icons/icon-192x192.png" },
  // ],
};

export async function generateStaticParams() {
  return [{ lang: "th" }, { lang: "en-US" }];
}

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={locale}>
      <body>
        <Navbar />
        <div className="content">{children}</div>
      </body>
    </html>
  );
}
