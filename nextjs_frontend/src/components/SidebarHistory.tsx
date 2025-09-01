"use client";

import React from "react";
import { BlogOut, listBlogs } from "@/lib/api";

export default function SidebarHistory({ refreshSignal }: { refreshSignal?: number }) {
  const [items, setItems] = React.useState<BlogOut[]>([]);
  const [loading, setLoading] = React.useState(false);

  async function load() {
    setLoading(true);
    try {
      const data = await listBlogs({ limit: 20, skip: 0 });
      setItems(data.items.slice(0, 20));
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    load();
  }, [refreshSignal]);

  return (
    <aside className="bg-white border rounded-lg p-3 sticky top-[76px]">
      <h3 className="font-semibold text-gray-900 mb-2">Recent</h3>
      {loading && <p className="text-sm text-gray-600">Loading...</p>}
      <ul className="space-y-2">
        {items.map((b) => (
          <li key={b.id}>
            <a href={`#blog-${b.id}`} className="text-sm text-[var(--color-primary)] hover:underline">
              {b.title}
            </a>
            <div className="text-[11px] text-gray-500">{new Date(b.updated_at).toLocaleDateString()}</div>
          </li>
        ))}
        {!loading && items.length === 0 && <li className="text-sm text-gray-600">No history</li>}
      </ul>
    </aside>
  );
}
