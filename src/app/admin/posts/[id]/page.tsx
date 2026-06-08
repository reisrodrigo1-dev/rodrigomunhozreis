"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { PostEditor } from "@/components/admin/post-editor";
import { getPost, updatePost, deletePost, type PostInput } from "@/lib/posts-admin";
import type { Post } from "@/lib/posts";

export default function EditPost() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params.id;
  const [post, setPost] = useState<Post | null>(null);
  const [state, setState] = useState<"loading" | "ok" | "notfound">("loading");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getPost(id)
      .then((p) => {
        if (p) {
          setPost(p);
          setState("ok");
        } else {
          setState("notfound");
        }
      })
      .catch(() => setState("notfound"));
  }, [id]);

  async function save(data: PostInput) {
    setSaving(true);
    try {
      await updatePost(id, data);
      router.push("/admin/posts");
    } catch {
      alert("Erro ao salvar.");
      setSaving(false);
    }
  }

  async function remove() {
    if (!confirm("Excluir este post? Esta ação não pode ser desfeita.")) return;
    try {
      await deletePost(id);
      router.push("/admin/posts");
    } catch {
      alert("Erro ao excluir.");
    }
  }

  if (state === "loading") return <p className="text-muted">Carregando…</p>;
  if (state === "notfound") return <p className="text-muted">Post não encontrado.</p>;

  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold">Editar post</h1>
      <div className="mt-6">
        <PostEditor initial={post!} onSave={save} onDelete={remove} saving={saving} />
      </div>
    </div>
  );
}
