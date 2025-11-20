import "./globals.css";
import type { Metadata } from "next";
import Providers from "./components/Providers";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "Daily Journal",
  description: "AI powered personal journal",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 min-h-screen">
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}