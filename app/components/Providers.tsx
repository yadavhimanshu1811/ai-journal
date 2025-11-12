"use client";

import React from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  // later: add SessionProvider, ThemeProvider, Toast, etc.
  return <>{children}</>;
}