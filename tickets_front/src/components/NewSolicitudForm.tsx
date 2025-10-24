//components/NewSolicitudForm.tsx
import { useState } from "react";
import { apiPost } from "../services/api";
import { useAuth } from "../context/AuthContext";

export function NewSolicitudForm({ onCreated }: { onCreated: (s: any) => void }) {
  const [desc, setDesc] = useState("");
  const [tipo, setTipo] = useState(1);
  const { user } = useAuth();

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    if (!user?.numero_identificacion) {
      console.error("⚠️ El usuario no tiene número de identificación registrado.");
      return;
    }

    const payload = {
      descripcion_solicitud: desc,
      codigo_tipo_solicitud: tipo,
      numero_identificacion_funcionario: user.numero_identificacion,
    };

    try {
      const created = await apiPost("/solicitudes/", payload);
      onCreated(created);
      console.log("✅ Solicitud creada:", created);
      setDesc("");
      setTipo(1);
    } catch (error) {
      console.error("❌ Error al crear solicitud:", error);
    }
  }

  return (
    <form
      onSubmit={submit}
      className="space-y-3 bg-white p-4 rounded-md shadow-md"
    >
      <textarea
        required
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        className="w-full p-3 rounded border border-gray-300"
        placeholder="Describe tu problema..."
      />

      <div className="flex items-center gap-2">
        <select
          value={tipo}
          onChange={(e) => setTipo(Number(e.target.value))}
          className="p-2 rounded border border-gray-300"
        >
          <option value={1}>Hardware</option>
          <option value={2}>Software</option>
          <option value={3}>Red</option>
        </select>

        <button
          type="submit"
          className="ml-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Crear solicitud
        </button>
      </div>
    </form>
  );
}
