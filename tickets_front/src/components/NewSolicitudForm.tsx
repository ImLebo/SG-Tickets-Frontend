import { useEffect, useState } from "react";
import { apiGet, apiPost } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

export function NewSolicitudForm({ onCreated }: { onCreated: (s: any) => void }) {
  const [desc, setDesc] = useState("");
  const [tipo, setTipo] = useState<number | null>(null);
  const [tipos, setTipos] = useState<any[]>([]);
  const [loadingTipos, setLoadingTipos] = useState(true);
  const { user } = useAuth();

  // 🔹 Cargar tipos de solicitud al iniciar
  useEffect(() => {
    async function loadTipos() {
      try {
        const data = await apiGet("/catalogos/tipos-solicitud");
        setTipos(data);
      } catch (err) {
        console.error("❌ Error al cargar tipos de solicitud:", err);
      } finally {
        setLoadingTipos(false);
      }
    }
    loadTipos();
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    if (!user?.numero_identificacion) {
      console.error("⚠️ El usuario no tiene número de identificación registrado.");
      return;
    }

    if (!tipo) {
      alert("Por favor selecciona un tipo de solicitud.");
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
      setDesc("");
      setTipo(null);
    } catch (error) {
      console.error("❌ Error al crear solicitud:", error);
      alert("No se pudo crear la solicitud.");
    }
  }

  return (
    <motion.form
      onSubmit={submit}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28 }}
      className="space-y-4 bg-white dark:bg-gray-800 dark:text-gray-100 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 transition-colors"
    >
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Descripción</label>
      <textarea
        required
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        placeholder="Describe tu problema..."
      />

      <div className="flex items-center gap-3">
        {loadingTipos ? (
          <div className="animate-pulse text-gray-400 text-sm">Cargando tipos...</div>
        ) : (
          <select
            value={tipo ?? ""}
            onChange={(e) => setTipo(Number(e.target.value))}
            className="p-2 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          >
            <option value="">Seleccionar tipo...</option>
            {tipos.map((t) => (
              <option key={t.codigo_tipo_solicitud} value={t.codigo_tipo_solicitud}>
                {t.nombre_tipo_solicitud}
              </option>
            ))}
          </select>
        )}

        <button
          type="submit"
          disabled={loadingTipos}
          className="ml-auto inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Crear solicitud
        </button>
      </div>
    </motion.form>
  );
}
