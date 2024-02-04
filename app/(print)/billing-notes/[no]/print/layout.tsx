import type { Viewport } from "next";
import "~/styles/print.scss";
import "paper-css/paper.css";

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
      <body className="A4">{children}</body>
    </html>
  );
}
