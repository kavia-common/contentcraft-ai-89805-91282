"use client";

import React from "react";
import Header from "@/components/Header";
import AuthForms from "@/components/AuthForms";
import PromptInput from "@/components/PromptInput";
import BlogList from "@/components/BlogList";
import BlogEditorModal from "@/components/BlogEditorModal";
import SidebarHistory from "@/components/SidebarHistory";
import { me, GenerateResponse, BlogOut } from "@/lib/api";

export default function Home() {
  const [authed, setAuthed] = React.useState<boolean | null>(null);
  const [editorOpen, setEditorOpen] = React.useState(false);
  const [generatedDraft, setGeneratedDraft] = React.useState<GenerateResponse | null>(null);
  const [editBlog, setEditBlog] = React.useState<BlogOut | null>(null);
  const [refreshSignal, setRefreshSignal] = React.useState(0);

  React.useEffect(() => {
    (async () => {
      const user = await me();
      setAuthed(!!user);
    })();
  }, []);

  function handleGenerated(draft: GenerateResponse) {
    setGeneratedDraft(draft);
    setEditorOpen(true);
  }

  function handleOpenNew() {
    setGeneratedDraft({ title: "", content: "" });
    setEditorOpen(true);
  }

  function handleSaved() {
    setRefreshSignal((n) => n + 1);
    setEditBlog(null);
    setGeneratedDraft(null);
  }

  return (
    <>
      <Header onOpenEditor={authed ? handleOpenNew : undefined} />
      <main className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          {!authed && (
            <AuthForms />
          )}
          {authed && (
            <>
              <PromptInput onGenerated={handleGenerated} />
              <BlogList
                onEdit={(b) => {
                  setEditBlog(b);
                  setEditorOpen(true);
                }}
                refreshSignal={refreshSignal}
              />
            </>
          )}
        </div>
        <div className="lg:col-span-4">
          <SidebarHistory refreshSignal={refreshSignal} />
        </div>
      </main>

      <BlogEditorModal
        open={editorOpen}
        onClose={() => {
          setEditorOpen(false);
          setEditBlog(null);
          setGeneratedDraft(null);
        }}
        initialTitle={generatedDraft?.title}
        initialContent={generatedDraft?.content}
        promptUsed={generatedDraft ? "Prompt-based" : null}
        blog={editBlog}
        onSaved={handleSaved}
      />
    </>
  );
}
