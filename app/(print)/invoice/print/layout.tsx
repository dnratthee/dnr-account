import type { Viewport } from "next";
import "~/styles/print.scss";

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
        <div className="print">{children}</div>
      </body>
    </html>
  );
}
