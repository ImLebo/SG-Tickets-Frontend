// components/HistorialModal.tsx
import { useEffect, useState } from "react";
import { apiGet } from "../services/api";
import { motion } from "framer-motion";

export function HistorialModal({
  codigo,
  onClose,
}: {
  codigo: number;
  onClose: () => void;
}) {
  const [hist, setHist] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const data = await apiGet(`/solicitudes/${codigo}/historial`);
        if (mounted) setHist(data);
      } catch (err) {
        console.error("Error al cargar historial:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [codigo]);

  function fmt(d: string) {
    try {
      return new Date(d).toLocaleString();
    } catch {
      return d;
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <motion.div
        initial={{ y: 18, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 12, opacity: 0 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        className="relative bg-white dark:bg-gray-900 dark:text-gray-100 rounded-2xl shadow-2xl w-full max-w-4xl p-6 overflow-auto max-h-[86vh] border border-gray-200 dark:border-gray-700 transition-colors duration-300"
      >
        <div className="flex items-center justify-between mb-5 border-b border-gray-200 dark:border-gray-700 pb-3">
          <h3 className="text-xl font-bold tracking-tight">
            Historial de Solicitud <span className="text-indigo-600 dark:text-indigo-400">#{codigo}</span>
          </h3>
          <button onClick={onClose} className="px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm font-medium">
            ✕ Cerrar
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12 animate-pulse text-gray-600 dark:text-gray-300">Cargando historial...</div>
        ) : hist.length === 0 ? (
          <div className="text-center text-sm text-gray-500 dark:text-gray-400 py-6">No hay cambios registrados.</div>
        ) : (
          <div className="space-y-4">
            {hist.map((h, i) => (
              <motion.div
                key={h.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.25 }}
                className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">{fmt(h.fecha_cambio)}</div>
                    <div className="text-base font-medium leading-snug">{h.observacion ?? <span className="italic text-gray-400">Sin observación</span>}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{h.numero_identificacion_tecnico ? `👨‍🔧 Técnico: ${h.numero_identificacion_tecnico}` : "👤 Acción de funcionario"}</div>
                  </div>

                  <div className="text-right text-sm flex-shrink-0">
                    <div className="text-xs text-gray-500 dark:text-gray-400">De:</div>
                    <div className="font-semibold text-yellow-600 dark:text-yellow-400">{String(h.estado_anterior ?? "-")}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">A:</div>
                    <div className="font-semibold text-green-600 dark:text-green-400">{String(h.estado_nuevo ?? "-")}</div>
                  </div>
                </div>

                {h.detalle && (
                  <details className="mt-3 text-sm text-gray-700 dark:text-gray-200 group">
                    <summary className="cursor-pointer select-none font-medium text-indigo-600 dark:text-indigo-400 hover:underline">📋 Ver detalle</summary>

                    <div className="mt-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-3 text-sm divide-y divide-gray-100 dark:divide-gray-800 transition-colors duration-300 shadow-inner">
                      {Object.entries(h.detalle).map(([key, value]) => (
                        <div key={key} className="py-1 flex justify-between items-start">
                          <span className="font-medium capitalize text-gray-800 dark:text-gray-300">{key.replace(/_/g, " ")}:</span>
                          <span className="text-gray-600 dark:text-gray-400 text-right max-w-[60%] break-words">{typeof value === "object" ? JSON.stringify(value, null, 2) : String(value)}</span>
                        </div>
                      ))}
                    </div>
                  </details>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
