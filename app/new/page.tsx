"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewEntryPage() {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/entries/new", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "Something went wrong");
      return;
    }

    router.push("/dashboard");
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">New Journal Entry</h1>

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
    </div>
  );
}