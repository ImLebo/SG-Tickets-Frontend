import { useState } from "react";
import { apiPost } from "../services/api";
import { useAuth } from "../context/AuthContext";

export function NewSolicitudForm({ onCreated }: { onCreated: (s: any) => void }) {
  const [desc, setDesc] = useState("");
  const [tipo, setTipo] = useState(1);
  const { user } = useAuth();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    const payload = {
      descripcion_solicitud: desc,
      codigo_tipo_solicitud: tipo,
      numero_identificacion_funcionario: user.numero_identificacion,
    };
    const created = await apiPost("/solicitudes/", payload);
    onCreated(created);
    setDesc("");
  }

  return (
    <form onSubmit={submit} className="space-y-3 bg-white p-4 rounded-md shadow">
      <textarea
        required
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        className="w-full p-3 rounded"
        placeholder="Describe tu problema..."
      />
      <div className="flex items-center gap-2">
        <select value={tipo} onChange={(e) => setTipo(Number(e.target.value))} className="p-2 rounded">
          <option value={1}>Hardware</option>
          <option value={2}>Software</option>
          <option value={3}>Red</option>
        </select>
        <button className="ml-auto px-4 py-2 bg-primary text-white rounded">Crear solicitud</button>
      </div>
    </form>
  );
}
