"use client";

import { useState } from "react";
import { marked } from "marked";
import { renderMarkdown } from "@/lib/markdown";
import { slugify, type Post } from "@/lib/posts";
import type { PostInput } from "@/lib/posts-admin";

const field = "min-h-[44px] w-full rounded-lg border border-line bg-white px-4 text-sm outline-none focus:border-amber";

export function PostEditor({
  initial,
  onSave,
  onDelete,
  saving,
}: {
  initial?: Post;
  onSave: (data: PostInput) => void;
  onDelete?: () => void;
  saving?: boolean;
}) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [tags, setTags] = useState((initial?.tags ?? []).join(", "));
  const [coverUrl, setCoverUrl] = useState(initial?.coverUrl ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const [status, setStatus] = useState<Post["status"]>(initial?.status ?? "draft");
  const [preview, setPreview] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    onSave({
      title,
      slug: slug.trim() || slugify(title),
      excerpt,
      content,
      coverUrl: coverUrl.trim() || undefined,
      status,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
    });
  }

  return (
    <form onSubmit={submit} className="max-w-3xl">
      <div className="grid gap-4">
        <label className="block">
          <span className="text-sm font-medium">Título</span>
          <input
            className={`${field} mt-1`}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => !slug && setSlug(slugify(title))}
            required
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium">Slug (URL)</span>
            <input
              className={`${field} mt-1`}
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder={slugify(title) || "meu-artigo"}
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium">Tags (separadas por vírgula)</span>
            <input className={`${field} mt-1`} value={tags} onChange={(e) => setTags(e.target.value)} />
          </label>
        </div>

        <label className="block">
          <span className="text-sm font-medium">Resumo</span>
          <textarea
            className={`${field} mt-1 min-h-[70px] py-2`}
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium">Imagem de capa (URL, opcional)</span>
          <input className={`${field} mt-1`} value={coverUrl} onChange={(e) => setCoverUrl(e.target.value)} />
        </label>

        <div>
          <div className="mb-1 flex items-center justify-between">
            <span className="text-sm font-medium">Conteúdo (Markdown)</span>
            <button
              type="button"
              onClick={() => setPreview((p) => !p)}
              className="text-sm text-amber-deep hover:underline"
            >
              {preview ? "Editar" : "Pré-visualizar"}
            </button>
          </div>
          {preview ? (
            <div
              className="prose prose-stone max-w-none rounded-lg border border-line bg-white p-4 prose-headings:font-serif"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(marked.parse(content || "*Sem conteúdo*") as string) }}
            />
          ) : (
            <textarea
              className={`${field} min-h-[320px] py-3 font-mono`}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={"# Título\n\nEscreva em **Markdown**…"}
            />
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3 border-t border-line pt-4">
          <label className="flex items-center gap-2 text-sm">
            Status
            <select
              className="rounded-lg border border-line bg-white px-3 py-2 text-sm outline-none focus:border-amber"
              value={status}
              onChange={(e) => setStatus(e.target.value as Post["status"])}
            >
              <option value="draft">Rascunho</option>
              <option value="published">Publicado</option>
            </select>
          </label>
          <button type="submit" disabled={saving} className="btn btn-primary disabled:opacity-60">
            {saving ? "Salvando…" : "Salvar"}
          </button>
          {onDelete && (
            <button
              type="button"
              onClick={onDelete}
              className="ml-auto text-sm text-red-500 hover:underline"
            >
              Excluir
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
