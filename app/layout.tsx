import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Burmese College Dataset Collector",
  description: "Collect Burmese Myanmar college data with glassmorphism UI",
  manifest: "/manifest.json",
  themeColor: "#0f172a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}