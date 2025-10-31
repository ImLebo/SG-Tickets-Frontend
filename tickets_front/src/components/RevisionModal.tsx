import { useEffect, useState } from "react";
import { apiGet, apiPut } from "../services/api";
import { motion } from "framer-motion";

interface Props {
  solicitud: any;
  onClose: () => void;
  onUpdated: () => void;
}

interface Estado {
  codigo_estado: number;
  nombre_estado: string;
}

export function RevisionModal({ solicitud, onClose, onUpdated }: Props) {
  const [estados, setEstados] = useState<Estado[]>([]);
  const [selectedEstado, setSelectedEstado] = useState<string>(solicitud.estado ?? "");
  const [observacion, setObservacion] = useState<string>(solicitud.observacion_tecnico ?? "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadEstados() {
      try {
        const est = await apiGet("/catalogos/estados");
        setEstados(est);
      } catch (err) {
        console.error("Error cargando estados:", err);
      }
    }
    loadEstados();
  }, []);

  async function handleSave() {
    if (!selectedEstado) {
      alert("Debe seleccionar un estado");
      return;
    }

    setLoading(true);
    try {
      await apiPut(`/solicitudes/${solicitud.codigo_solicitud}`, {
        estado: selectedEstado,
        observacion_tecnico: observacion,
      });
      onUpdated();
      onClose();
    } catch (err) {
      console.error("Error guardando revisión:", err);
      alert("No se pudo guardar la revisión");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ y: 50, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 50, opacity: 0, scale: 0.9 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-xl p-8 md:p-10 relative overflow-hidden"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
          Revisión de Solicitud
        </h2>

        <div className="mb-6 p-4 rounded-xl bg-gray-100 dark:bg-gray-800 shadow-inner">
          <p className="text-sm md:text-base text-gray-700 dark:text-gray-300">
            <span className="font-semibold">Código:</span> #{solicitud.codigo_solicitud}
          </p>
          <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 mt-1">
            <span className="font-semibold">Descripción:</span> {solicitud.descripcion_solicitud}
          </p>
          <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 mt-1">
            <span className="font-semibold">Funcionario:</span> {solicitud.nombre_funcionario}
          </p>
          <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 mt-1">
            <span className="font-semibold">Dependencia:</span> {solicitud.dependencia}
          </p>
        </div>

        {/* Estado */}
        <div className="mb-6">
          <label className="block text-gray-800 dark:text-gray-200 font-medium mb-2">Estado</label>
          <select
            value={selectedEstado}
            onChange={(e) => setSelectedEstado(e.target.value)}
            className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          >
            <option value="">Seleccionar estado...</option>
            {estados.map((e) => (
              <option key={e.codigo_estado} value={e.nombre_estado}>
                {e.nombre_estado}
              </option>
            ))}
          </select>
        </div>

        {/* Observaciones */}
        <div className="mb-6">
          <label className="block text-gray-800 dark:text-gray-200 font-medium mb-2">Observaciones</label>
          <textarea
            value={observacion}
            onChange={(e) => setObservacion(e.target.value)}
            rows={5}
            placeholder="Ingrese sus observaciones..."
            className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 text-base resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>

        {/* Botones */}
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition text-base font-medium"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition text-base font-medium disabled:opacity-50"
          >
            {loading ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
