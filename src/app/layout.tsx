import "./globals.css";
import AppProvider from "@/provider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sasahyog Technologies - Ticket System",
  description: "This ticket sytem is powered by sasahyog technologies.",
  openGraph: {
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
