"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid credentials");
      return;
    }

    router.push("/dashboard");
  }

  return (
    <div className="max-w-sm mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Login</h1>

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label>Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border rounded-md bg-background"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded-md bg-background"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="w-full bg-primary text-primary-foreground py-2 rounded-md">
          Sign In
        </button>

        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
      <button
        onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
        className="flex items-center justify-center gap-3 w-full py-2.5 border border-gray-300 rounded-lg 
             hover:bg-gray-100 active:bg-gray-200 transition-all text-gray-700 font-medium"
      >
        {/* Google Logo */}
        <svg
          className="w-5 h-5"
          viewBox="0 0 488 512"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#EA4335"
            d="M488 261.8c0-17-1.5-33.5-4.3-49.4H249v93.5h135.6c-5.9 31.8-23.4 58.8-50 76.7v63h81.1c47.4-43.7 74.3-108.1 74.3-184.8z"
          />
          <path
            fill="#34A853"
            d="M249 492c67.5 0 124.1-22.4 165.5-60.7l-81.1-63c-22.5 15.1-51.2 24-84.4 24-64.8 0-119.6-43.7-139.2-102.5H26.5v64.4C67.7 436 152.5 492 249 492z"
          />
          <path
            fill="#4A90E2"
            d="M109.8 289.8c-4.8-14.4-7.5-29.8-7.5-45.8s2.7-31.4 7.5-45.8V133.8H26.5A244.7 244.7 0 000 244c0 38.5 9.3 75 26.5 110.2l83.3-64.4z"
          />
          <path
            fill="#FBBC05"
            d="M249 97.7c36.7 0 69.7 12.6 95.6 37.4l71.4-71.4C373.7 21.2 316.5 0 249 0 152.5 0 67.7 56 26.5 133.8l83.3 64.4C129.4 141.4 184.2 97.7 249 97.7z"
          />
        </svg>

        <span>Continue with Google</span>
      </button>
    </div>
  );
}
