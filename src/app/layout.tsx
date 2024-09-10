import type { Metadata } from "next";
import "./globals.css";
import Footer from "./_components/Footer";
import Header from "./_components/Header";

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
      <body className="relative font-mono flex flex-col min-h-screen antialiased min-w-80">
        <Header />

        <div>
          <main className="min-h-screen h-full">{children}</main>
        </div>

        <Footer />
      </body>
    </html>
  );
}
