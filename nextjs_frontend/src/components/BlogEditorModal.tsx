"use client";

import React from "react";
import { BlogOut, BlogUpdate, patchBlog, createBlog } from "@/lib/api";

type Props = {
  open: boolean;
  onClose: () => void;
  initialTitle?: string;
  initialContent?: string;
  blog?: BlogOut | null;
  promptUsed?: string | null;
  onSaved?: (blog: BlogOut) => void;
};

export default function BlogEditorModal({ open, onClose, initialTitle, initialContent, blog, promptUsed, onSaved }: Props) {
  const [title, setTitle] = React.useState(initialTitle || blog?.title || "");
  const [content, setContent] = React.useState(initialContent || blog?.edited_content || blog?.generated_content || "");
  const [status, setStatus] = React.useState(blog?.status || "draft");
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    setTitle(initialTitle || blog?.title || "");
    setContent(initialContent || blog?.edited_content || blog?.generated_content || "");
    setStatus(blog?.status || "draft");
  }, [initialTitle, initialContent, blog]);

  async function handleSave() {
    setError(null);
    setSaving(true);
    try {
      if (blog) {
        const payload: BlogUpdate = {
          title,
          edited_content: content,
          status,
        };
        const updated = await patchBlog(blog.id, payload);
        onSaved?.(updated);
      } else {
        const created = await createBlog({
          title,
          prompt: promptUsed || null || undefined,
          generated_content: initialContent || "",
          edited_content: content,
          status,
        });
        onSaved?.(created);
      }
      onClose();
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : typeof err === "string"
          ? err
          : "Failed to save blog";
      setError(message);
    } finally {
      setSaving(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 px-3">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h3 className="font-semibold text-gray-900">{blog ? "Edit Blog" : "Save Draft"}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>
        <div className="p-4 space-y-3">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Title</label>
            <input
              className="w-full border rounded-md px-3 py-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a clear, compelling title"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Content (Markdown)</label>
            <textarea
              className="w-full min-h-60 border rounded-md px-3 py-2"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write or edit the content here..."
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
        <div className="px-4 py-3 border-t flex items-center justify-end gap-2">
          <button onClick={onClose} className="px-3 py-2 rounded-md border text-gray-700 hover:bg-gray-50">Cancel</button>
          <button
            onClick={handleSave}
            disabled={saving || !title.trim()}
            className="px-4 py-2 rounded-md text-white bg-[var(--color-primary)] hover:opacity-90 disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
