"use client";

import React from "react";

/**
 * Minimal markdown preview fallback using <pre>.
 * For richer rendering, a markdown library can be added later.
 */
export default function MarkdownPreview({ content }: { content: string }) {
  return (
    <pre className="whitespace-pre-wrap text-gray-800 prose">{content}</pre>
  );
}
