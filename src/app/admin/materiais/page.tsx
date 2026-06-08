"use client";

import { useEffect, useState } from "react";
import { slugify } from "@/lib/posts";
import type { Material } from "@/lib/materials";
import {
  getMaterialsDb,
  createMaterial,
  deleteMaterial,
  uploadMaterialFile,
} from "@/lib/materials-db";

const field = "min-h-[40px] w-full rounded-lg border border-line px-3 text-sm outline-none focus:border-amber";
const types: Material["type"][] = ["ebook", "guia", "cartao"];

export default function AdminMateriais() {
  const [rows, setRows] = useState<Material[]>([]);
  const [state, setState] = useState<"loading" | "ok" | "error">("loading");

  const [title, setTitle] = useState("");
  const [type, setType] = useState<Material["type"]>("ebook");
  const [description, setDescription] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getMaterialsDb()
      .then((r) => {
        setRows(r);
        setState("ok");
      })
      .catch(() => setState("error"));
  }, []);

  async function onUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadMaterialFile(file);
      setFileUrl(url);
    } catch {
      alert("Erro no upload. Confirme as regras do Storage.");
    } finally {
      setUploading(false);
    }
  }

  async function add() {
    if (!title.trim() || !fileUrl.trim()) {
      alert("Preencha o título e envie o arquivo (ou cole a URL).");
      return;
    }
    setSaving(true);
    try {
      const slug = slugify(title);
      const id = await createMaterial({ title: title.trim(), slug, type, description: description.trim(), fileUrl: fileUrl.trim() });
      setRows((r) => [{ id, title: title.trim(), slug, type, description: description.trim(), fileUrl: fileUrl.trim() }, ...r]);
      setTitle("");
      setDescription("");
      setFileUrl("");
    } catch {
      alert("Erro ao salvar.");
    } finally {
      setSaving(false);
    }
  }

  async function del(id: string) {
    if (!confirm("Excluir este material?")) return;
    try {
      await deleteMaterial(id);
      setRows((r) => r.filter((m) => m.id !== id));
    } catch {
      alert("Erro ao excluir.");
    }
  }

  return (
    <div className="max-w-3xl">
      <h1 className="font-serif text-3xl font-semibold">Materiais</h1>
      <p className="mt-2 text-sm text-muted">
        E-books e guias para captura de leads. O arquivo vai para o Firebase Storage.
      </p>

      {/* Novo material */}
      <div className="mt-6 rounded-2xl border border-line bg-white p-6">
        <h2 className="font-serif text-lg font-semibold">Novo material</h2>
        <div className="mt-4 flex flex-col gap-3">
          <input className={field} placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} />
          <div className="flex gap-3">
            <select className={`${field} w-40`} value={type} onChange={(e) => setType(e.target.value as Material["type"])}>
              {types.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <input className={field} placeholder="Descrição curta" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <label className="btn btn-ghost !px-4 !py-2 text-sm cursor-pointer">
              {uploading ? "Enviando…" : "Enviar arquivo"}
              <input type="file" className="hidden" onChange={onUpload} disabled={uploading} />
            </label>
            <input className={field} placeholder="ou cole a URL do arquivo" value={fileUrl} onChange={(e) => setFileUrl(e.target.value)} style={{ flex: 1, minWidth: 200 }} />
          </div>
          {fileUrl && <p className="truncate text-xs text-green-600">✓ {fileUrl}</p>}
          <button onClick={add} disabled={saving || uploading} className="btn btn-primary !px-5 !py-2 self-start disabled:opacity-50">
            {saving ? "Salvando…" : "Adicionar material"}
          </button>
        </div>
      </div>

      {/* Lista */}
      <div className="mt-8">
        <h2 className="font-serif text-lg font-semibold">Cadastrados no banco</h2>
        {state === "error" && <p className="mt-3 text-sm text-amber-deep">Não consegui ler os materiais.</p>}
        {state === "loading" ? (
          <p className="mt-3 text-sm text-muted">Carregando…</p>
        ) : rows.length === 0 ? (
          <p className="mt-3 text-sm text-muted">Nenhum material no banco ainda (os fixos do código continuam no site).</p>
        ) : (
          <ul className="mt-3 divide-y divide-line rounded-2xl border border-line bg-white">
            {rows.map((m) => (
              <li key={m.id} className="flex items-center justify-between gap-3 p-4">
                <div className="min-w-0">
                  <p className="font-medium text-ink">{m.title}</p>
                  <p className="truncate text-xs text-muted">{m.type} · {m.fileUrl}</p>
                </div>
                <button onClick={() => del(m.id)} className="shrink-0 text-xs text-red-500 hover:underline">Excluir</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
