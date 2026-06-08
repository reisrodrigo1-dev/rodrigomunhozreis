"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RobotEditor } from "@/components/admin/robot-editor";
import { createRobot, type RobotInput } from "@/lib/robots-db";

export default function NewRobot() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  async function save(data: RobotInput) {
    setSaving(true);
    try {
      await createRobot(data);
      router.push("/admin/robos");
    } catch {
      alert("Erro ao salvar. Verifique o Firestore e as regras.");
      setSaving(false);
    }
  }

  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold">Novo robô</h1>
      <div className="mt-6">
        <RobotEditor onSave={save} saving={saving} />
      </div>
    </div>
  );
}
