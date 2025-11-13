"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const isActive = (path: string) =>
    pathname === path ? "text-indigo-600 font-semibold" : "text-gray-600";

  return (
    <header className="w-full backdrop-blur-md bg-white/70 border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="rounded-xl bg-gradient-to-br from-indigo-500 to-pink-500 text-white w-10 h-10 flex items-center justify-center font-bold shadow-sm group-hover:scale-110 transition-transform">
            AI
          </div>
          <div className="text-xl font-bold tracking-tight group-hover:text-indigo-600 transition-colors">
            AI Journal
          </div>
        </Link>

        <nav className="flex items-center gap-2">

          <Link
            href="/dashboard"
            className={`
              px-4 py-2 rounded-lg text-sm transition-all 
              hover:bg-slate-100 hover:text-indigo-600
              ${isActive("/dashboard")}
            `}
          >
            Dashboard
          </Link>

          <Link
            href="/new"
            className={`
              px-4 py-2 rounded-lg text-sm transition-all
              hover:bg-slate-100 hover:text-indigo-600
              ${isActive("/new")}
            `}
          >
            New Entry
          </Link>

          {/* If user is NOT logged in */}
          {!session && (
            <>
              <Link
                href="/login"
                className="px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-700 hover:border-indigo-500 hover:text-indigo-600 transition-all"
              >
                Sign in
              </Link>

              <Link
                href="/signup"
                className="px-4 py-2 text-sm rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-all shadow-sm"
              >
                Sign up
              </Link>
            </>
          )}

          {/* If user IS logged in → Show Logout */}
          {session && (
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="px-4 py-2 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all shadow-sm"
            >
              Logout
            </button>
          )}

        </nav>
      </div>
    </header>
  );
}