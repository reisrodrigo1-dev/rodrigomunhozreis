"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PostEditor } from "@/components/admin/post-editor";
import { createPost, type PostInput } from "@/lib/posts-admin";

export default function NewPost() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  async function save(data: PostInput) {
    setSaving(true);
    try {
      await createPost(data);
      router.push("/admin/posts");
    } catch {
      alert("Erro ao salvar. Verifique o Firestore e as regras.");
      setSaving(false);
    }
  }

  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold">Novo post</h1>
      <div className="mt-6">
        <PostEditor onSave={save} saving={saving} />
      </div>
    </div>
  );
}
