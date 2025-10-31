import { useEffect, useState } from "react";
import { apiGet } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { FiltrosTecnico } from "./FiltrosTecnico";
import { RevisionModal } from "./RevisionModal";
import { HistorialModal } from "./HistorialModal";
import { motion, AnimatePresence } from "framer-motion";

interface Estado {
  codigo_estado: number;
  nombre_estado: string;
}

export function TecnicoList({
  mode,
  showFilters,
}: {
  mode: "solicitudes" | "revisiones";
  showFilters: boolean;
}) {
  const { user } = useAuth();
  const [list, setList] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [tipos, setTipos] = useState<any[]>([]);
  const [estados, setEstados] = useState<Estado[]>([]);
  const [loading, setLoading] = useState(true);

  const [modalSolicitud, setModalSolicitud] = useState<any | null>(null);
  const [modalHistorial, setModalHistorial] = useState<number | null>(null);

  async function load() {
    setLoading(true);
    try {
      const [solicitudes, tipos, estados] = await Promise.all([
        apiGet("/solicitudes/"),
        apiGet("/catalogos/tipos-solicitud"),
        apiGet("/catalogos/estados"),
      ]);
      setList(solicitudes);
      setTipos(tipos);
      setEstados(estados);
    } catch (err) {
      console.error("Error cargando solicitudes:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (!user) return;
    if (mode === "revisiones") {
      setFiltered(
        list.filter(
          (s) => s.numero_identificacion_tecnico === user.numero_identificacion
        )
      );
    } else {
      setFiltered(list.filter((s) => !s.numero_identificacion_tecnico));
    }
  }, [mode, list, user]);

  function handleFilter(filters: any) {
    let result = [...list];
    if (filters.estado)
      result = result.filter(
        (s) => s.estado.toLowerCase() === filters.estado.toLowerCase()
      );
    if (filters.tipo) result = result.filter((s) => s.tipo_solicitud === filters.tipo);
    if (filters.codigo)
      result = result.filter((s) =>
        String(s.codigo_solicitud).includes(filters.codigo)
      );
    if (filters.fechaInicio && filters.fechaFin) {
      const start = new Date(filters.fechaInicio);
      const end = new Date(filters.fechaFin);
      result = result.filter((s) => {
        const d = new Date(s.fecha_solicitud);
        return d >= start && d <= end;
      });
    }
    if (filters.busqueda)
      result = result.filter((s) =>
        s.descripcion_solicitud.toLowerCase().includes(filters.busqueda.toLowerCase())
      );
    setFiltered(result);
  }

  function tipoNombre(nombre: string) {
    const t = tipos.find((x) => x.nombre_tipo_solicitud === nombre);
    return t ? t.nombre_tipo_solicitud : nombre;
  }

  function estadoColor(estado: string) {
    switch (estado.toLowerCase()) {
      case "pendiente":
        return "bg-yellow-100 text-yellow-800";
      case "resuelto":
        return "bg-green-100 text-green-800";
      case "rechazada":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  }

  return (
    <div className="space-y-6">
      {/* Filtros animados */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6"
          >
            <FiltrosTecnico onFilter={handleFilter} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Listado principal */}
      {loading ? (
        <div className="text-center py-10 text-gray-500 dark:text-gray-400 animate-pulse">
          Cargando solicitudes...
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-10 text-gray-500 dark:text-gray-400">
          No hay solicitudes para mostrar.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((s) => (
            <motion.div
              key={s.codigo_solicitud}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 flex flex-col justify-between hover:shadow-xl transition-all"
            >
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-gray-400 dark:text-gray-500">
                    #{s.codigo_solicitud}
                  </span>
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${estadoColor(
                      s.estado
                    )}`}
                  >
                    {s.estado}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
                  {s.descripcion_solicitud}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                  Tipo: {tipoNombre(s.tipo_solicitud)}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                  Funcionario: {s.nombre_funcionario} ({s.dependencia})
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                  Técnico asignado:{" "}
                  {s.nombres_tecnico
                    ? `${s.nombres_tecnico} ${s.apellidos_tecnico}`
                    : "Sin asignar"}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  Fecha: {new Date(s.fecha_solicitud).toLocaleString()}
                </p>
              </div>

              {/* Botones siempre visibles */}
              <div className="mt-3 flex flex-col gap-3">
                <motion.button
                  onClick={() => setModalSolicitud(s)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full px-4 py-2 bg-indigo-600 text-white rounded-xl shadow-md hover:bg-indigo-700 transition-all font-medium"
                >
                  Revisar Solicitud
                </motion.button>

                <motion.button
                  onClick={() => setModalHistorial(s.codigo_solicitud)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full px-4 py-2 bg-gray-500 text-white rounded-xl shadow-md hover:bg-gray-600 transition-all font-medium"
                >
                  Ver Historial
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modales */}
      {modalSolicitud && (
        <RevisionModal
          solicitud={modalSolicitud}
          onClose={() => setModalSolicitud(null)}
          onUpdated={load}
        />
      )}

      {modalHistorial && (
        <HistorialModal
          codigo={modalHistorial}
          onClose={() => setModalHistorial(null)}
        />
      )}
    </div>
  );
}
