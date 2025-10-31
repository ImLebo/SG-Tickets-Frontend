// components/SolicitudForm.tsx
import { useEffect, useState } from "react";
import { apiGet, apiPost, apiPut } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

type Props = {
  initial?: {
    codigo_solicitud?: number;
    descripcion_solicitud?: string;
    codigo_tipo_solicitud?: number;
  };
  onSaved: (saved: any) => void;
  onCancel?: () => void;
};

export function SolicitudForm({ initial, onSaved, onCancel }: Props) {
  const { user } = useAuth();
  const [desc, setDesc] = useState(initial?.descripcion_solicitud ?? "");
  const [tipo, setTipo] = useState<number | null>(
    initial?.codigo_tipo_solicitud ?? null
  );
  const [tipos, setTipos] = useState<any[]>([]);
  const [loadingTipos, setLoadingTipos] = useState(true);
  const [loading, setLoading] = useState(false);
  const isEdit = Boolean(initial?.codigo_solicitud);

  // 🔹 Cargar tipos de solicitud
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
      setLoading(true);
      if (isEdit && initial?.codigo_solicitud) {
        const updated = await apiPut(`/solicitudes/${initial.codigo_solicitud}`, payload);
        onSaved(updated);
      } else {
        const created = await apiPost("/solicitudes/", payload);
        onSaved(created);
      }

      setDesc("");
      setTipo(null);
    } catch (error) {
      console.error("❌ Error al guardar solicitud:", error);
      alert("No se pudo guardar la solicitud.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.form
      onSubmit={submit}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-4 bg-white dark:bg-gray-800 dark:text-gray-100 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 transition-colors"
    >
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          {isEdit ? "Editar solicitud" : "Nueva solicitud"}
        </h3>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            Cancelar
          </button>
        )}
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Descripción
        </label>
        <textarea
          required
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition mt-2"
          placeholder="Describe tu problema..."
        />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Tipo de solicitud
        </label>
        {loadingTipos ? (
          <div className="animate-pulse text-gray-400 text-sm mt-2">
            Cargando tipos...
          </div>
        ) : (
          <select
            value={tipo ?? ""}
            onChange={(e) => setTipo(Number(e.target.value))}
            className="mt-2 w-full p-2 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          >
            <option value="">Seleccionar tipo...</option>
            {tipos.map((t) => (
              <option key={t.codigo_tipo_solicitud} value={t.codigo_tipo_solicitud}>
                {t.nombre_tipo_solicitud}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="flex justify-end gap-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition"
          >
            Cancelar
          </button>
        )}
        <button
          type="submit"
          disabled={loading || loadingTipos}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading
            ? isEdit
              ? "Guardando..."
              : "Creando..."
            : isEdit
            ? "Guardar cambios"
            : "Crear solicitud"}
        </button>
      </div>
    </motion.form>
  );
}
