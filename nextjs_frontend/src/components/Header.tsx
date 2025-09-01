"use client";

import React from "react";
import { logout, me } from "@/lib/api";

// Simple logo and nav with auth status
export default function Header({ onOpenEditor }: { onOpenEditor?: () => void }) {
  const [userEmail, setUserEmail] = React.useState<string | null>(null);

  React.useEffect(() => {
    (async () => {
      const u = await me();
      setUserEmail(u?.email ?? null);
    })();
  }, []);

  function handleLogout() {
    logout();
    window.location.reload();
  }

  return (
    <header className="w-full border-b bg-white sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-[var(--color-primary)] flex items-center justify-center text-white font-bold">CC</div>
          <span className="font-semibold text-lg text-gray-900">ContentCraft AI</span>
        </div>
        <nav className="flex items-center gap-3">
          {!!onOpenEditor && (
            <button
              onClick={onOpenEditor}
              className="px-3 py-2 rounded-md text-white bg-[var(--color-accent)] hover:opacity-90 transition"
            >
              New Blog
            </button>
          )}
          {userEmail ? (
            <>
              <span className="text-sm text-gray-700 hidden sm:inline">Signed in as {userEmail}</span>
              <button onClick={handleLogout} className="px-3 py-2 rounded-md border text-gray-700 hover:bg-gray-50">Logout</button>
            </>
          ) : (
            <a href="#auth" className="px-3 py-2 rounded-md border text-gray-700 hover:bg-gray-50">Login</a>
          )}
        </nav>
      </div>
    </header>
  );
}
