"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { RobotEditor } from "@/components/admin/robot-editor";
import { getRobot, updateRobot, deleteRobot, type RobotInput } from "@/lib/robots-db";
import type { Robot } from "@/lib/robots";

export default function EditRobot() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params.id;
  const [robot, setRobot] = useState<Robot | null>(null);
  const [state, setState] = useState<"loading" | "ok" | "notfound">("loading");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getRobot(id)
      .then((r) => {
        if (r) {
          setRobot(r);
          setState("ok");
        } else {
          setState("notfound");
        }
      })
      .catch(() => setState("notfound"));
  }, [id]);

  async function save(data: RobotInput) {
    setSaving(true);
    try {
      await updateRobot(id, data);
      router.push("/admin/robos");
    } catch {
      alert("Erro ao salvar.");
      setSaving(false);
    }
  }

  async function remove() {
    if (!confirm("Excluir este robô? Esta ação não pode ser desfeita.")) return;
    try {
      await deleteRobot(id);
      router.push("/admin/robos");
    } catch {
      alert("Erro ao excluir.");
    }
  }

  if (state === "loading") return <p className="text-muted">Carregando…</p>;
  if (state === "notfound") return <p className="text-muted">Robô não encontrado.</p>;

  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold">Editar robô</h1>
      <div className="mt-6">
        <RobotEditor initial={robot!} onSave={save} onDelete={remove} saving={saving} />
      </div>
    </div>
  );
}
