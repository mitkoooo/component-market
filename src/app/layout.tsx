import type { Metadata } from "next";
import "./globals.css";
import Footer from "./_components/Footer";
import Header from "./_components/Header";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "component-market",
  description: "A web application showcasing the prebuilt components",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="relative font-mono flex flex-col min-h-screen antialiased min-w-80 mt-[84px]">
        <Header />

        <div className="font-sans">
          <Toaster />
        </div>
        <Suspense fallback={<></>}>
          <main className="min-h-screen h-full">{children}</main>
        </Suspense>

        <Footer />
      </body>
    </html>
  );
}
