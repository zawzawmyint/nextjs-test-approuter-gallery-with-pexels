import Navbar from "./components/Navbar";
import "./globals.css";
import type { Metadata } from "next";

export const revalidate = 3600; // to revalidate every 1 hour

export const metadata: Metadata = {
  title: "Nextjs Image Gallery",
  description: "Nextjs Image Gallery description",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="max-w-6xl mx-auto">{children}</main>
      </body>
    </html>
  );
}
