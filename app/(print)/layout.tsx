import type { Viewport } from "next";
import "~/styles/print.scss";
import "paper-css/paper.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export async function generateStaticParams() {
  return [{ lang: "th" }, { lang: "en-US" }];
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params;
}) {
  return (
    <html lang={params.lang}>
      <body className="A4">{children}</body>
    </html>
  );
}
