import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ContentCraft AI",
  description: "AI-powered blog generation, editing, and management.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className="bg-[var(--color-background)] text-[var(--color-text)]">
        {children}
      </body>
    </html>
  );
}
