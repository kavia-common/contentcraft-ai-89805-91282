"use client";

import React from "react";
import { BlogOut, deleteBlog, listBlogs } from "@/lib/api";

export default function BlogList({
  onEdit,
  refreshSignal,
}: {
  onEdit: (blog: BlogOut) => void;
  refreshSignal?: number;
}) {
  const [blogs, setBlogs] = React.useState<BlogOut[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function load() {
    setError(null);
    setLoading(true);
    try {
      const data = await listBlogs({ limit: 100, skip: 0 });
      setBlogs(data.items);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to load blogs";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    load();
  }, [refreshSignal]);

  async function handleDelete(id: number) {
    if (!confirm("Delete this blog?")) return;
    try {
      await deleteBlog(id);
      await load();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to delete";
      alert(message);
    }
  }

  return (
    <section className="bg-white border rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold text-gray-900">Your Blogs</h2>
      </div>
      {loading && <p className="text-sm text-gray-600">Loading...</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}
      <ul className="divide-y">
        {blogs.map((b) => (
          <li key={b.id} className="py-3 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <div className="flex-1">
              <a href={`#blog-${b.id}`} className="font-medium text-[var(--color-primary)] hover:underline">{b.title}</a>
              <div className="text-xs text-gray-500">
                {new Date(b.updated_at).toLocaleString()} • {b.status}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onEdit(b)}
                className="px-3 py-1.5 rounded-md border text-gray-700 hover:bg-gray-50"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(b.id)}
                className="px-3 py-1.5 rounded-md text-white bg-red-600 hover:opacity-90"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
        {!loading && blogs.length === 0 && (
          <li className="py-6 text-sm text-gray-600">No blogs yet. Generate or create one to get started.</li>
        )}
      </ul>
    </section>
  );
}
