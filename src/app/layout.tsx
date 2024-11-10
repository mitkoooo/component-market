import type { Metadata } from "next";
import "@/app/_styles/globals.css";
import Footer from "./_components/Footer";
import Header from "./_components/Header";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";
import Spinner from "./_components/Spinner";

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
      <body className="relative font-mono flex flex-col min-h-screen antialiased min-w-80 mt-[84px] bg-white text-black">
        <Header />

        <div className="font-sans">
          <Toaster />
        </div>
        <Suspense
          fallback={
            <div className="h-screen flex items-center">
              <Spinner />
            </div>
          }
        >
          <main className="min-h-screen h-full">{children}</main>
        </Suspense>

        <Footer />
      </body>
    </html>
  );
}
