import type { Metadata } from "next";
import "./globals.css";
import "../css/wireframe.css"
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: "http:github.com/vctrubio", //how to into a node 
  description: "clean",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
