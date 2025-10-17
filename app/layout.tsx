import "./../styles/globals.css";
import Providers from "./providers";
import Header from "@/components/Header";
import CartSidebar from "@/components/CartSidebar";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Swan Shop", description: "Demo e-commerce catalog built with Next.js" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          <CartSidebar />
          <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
