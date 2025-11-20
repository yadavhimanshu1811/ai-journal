"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function NewEntryPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    if(content.trim().length < 10){
      setError("Write atleast 10 letters");
      setLoading(false);
      return;
    }

    // ------- CALL SERVER (Groq) FOR SUMMARY -------
    const summaryRes = await fetch("/api/ai/summarize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: content }),
    });
    const { summary } = await summaryRes.json();

    // ------- CALL SERVER (Groq) FOR MOOD -------
    const moodRes = await fetch("/api/ai/mood", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: content }),
    });
    const { mood } = await moodRes.json();

    // 2) Save to database
    const res = await fetch("/api/entries/new", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, summary, mood }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "Something went wrong");
      return;
    }

    router.push("/dashboard");
  }

  return (session ?
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-full hover:bg-slate-200 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 text-gray-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>

        <h1 className="text-2xl font-bold">New Journal Entry</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          rows={8}
          placeholder="Write your thoughts..."
          className="w-full border p-3 rounded-md bg-background"
          onChange={(e) => setContent(e.target.value)}
        />

        <button
          disabled={loading}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md"
        >
          {loading ? "Saving..." : "Save Entry"}
        </button>

        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
    </div>: <div className="text-center mt-10">
        <p className="text-lg">You are not logged in.</p>
        <Link href="/login" className="text-primary underline">
          Go to Login
        </Link>
      </div>
  );
}
