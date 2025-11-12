"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
// If you have shadcn Button, uncomment the import below
// import { Button } from "@/components/ui/button";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="w-full bg-white border-b">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="rounded-md bg-gradient-to-r from-indigo-500 to-pink-500 text-white w-10 h-10 flex items-center justify-center font-bold">
            AI
          </div>
          <div className="text-lg font-semibold">AI Journal</div>
        </Link>

        <nav className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className={`px-3 py-2 rounded-md ${
              pathname === "/dashboard" ? "bg-slate-100" : "hover:bg-slate-50"
            }`}
          >
            Dashboard
          </Link>

          <Link href="/new" className="px-3 py-2 rounded-md hover:bg-slate-50">
            New Entry
          </Link>

          {/* fallback simple CTA if shadcn Button not present */}
          <Link
            href="/login"
            className="inline-block px-3 py-1 rounded-md bg-indigo-600 text-white"
          >
            Sign in
          </Link>
          <Link href="/signup" className="px-3 py-1 rounded-md bg-accent">
            Sign up
          </Link>
        </nav>
      </div>
    </header>
  );
}
