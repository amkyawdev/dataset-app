import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Token Stream Dataset Collector",
  description: "Build high-quality training data for Burmese LLM fine-tuning",
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