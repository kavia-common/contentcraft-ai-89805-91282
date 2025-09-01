"use client";

import React from "react";
import { generateDraft, GenerateResponse } from "@/lib/api";

export default function PromptInput({ onGenerated }: { onGenerated: (draft: GenerateResponse) => void }) {
  const [prompt, setPrompt] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const result = await generateDraft({ prompt });
      onGenerated(result);
      setPrompt("");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to generate";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="bg-white border rounded-lg p-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-2">Generate a Blog</h2>
      <form onSubmit={handleGenerate} className="space-y-3">
        <textarea
          className="w-full min-h-28 border rounded-md px-3 py-2"
          placeholder="Describe your blog topic and requirements..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          required
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 rounded-md text-white bg-[var(--color-accent)] hover:opacity-90 transition disabled:opacity-60"
        >
          {loading ? "Generating..." : "Generate Draft"}
        </button>
      </form>
    </section>
  );
}
