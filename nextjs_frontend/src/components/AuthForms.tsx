"use client";

import React from "react";
import { login, signup } from "@/lib/api";

export default function AuthForms() {
  const [isLogin, setIsLogin] = React.useState(true);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [fullName, setFullName] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(email, password, fullName || undefined);
        await login(email, password);
      }
      window.location.hash = "";
      window.location.reload();
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : typeof err === "string"
          ? err
          : "Something went wrong";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="auth" className="bg-white border rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold text-gray-900">{isLogin ? "Login" : "Create Account"}</h2>
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-[var(--color-primary)] hover:underline text-sm"
        >
          {isLogin ? "Need an account?" : "Have an account?"}
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-3">
        {!isLogin && (
          <div>
            <label className="block text-sm text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
              placeholder="Jane Doe"
            />
          </div>
        )}
        <div>
          <label className="block text-sm text-gray-700 mb-1">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-md px-3 py-2"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Password</label>
          <input
            type="password"
            minLength={6}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-md px-3 py-2"
            placeholder="••••••••"
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 rounded-md text-white bg-[var(--color-primary)] hover:opacity-90 transition disabled:opacity-60"
        >
          {loading ? "Please wait..." : isLogin ? "Login" : "Sign up"}
        </button>
      </form>
    </section>
  );
}
