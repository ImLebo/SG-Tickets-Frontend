import { useEffect, useState } from "react";
import { apiGet, apiPut } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { SolicitudForm } from "./SolicitudForm";
import { HistorialModal } from "./HistorialModal";
import { motion } from "framer-motion";
import {
  MessageSquare,
  Clock,
  CheckCircle2,
  User,
  XCircle,
  MapPin,
  Wrench,
  Mail,
  Phone,
} from "lucide-react";
import type { Solicitud } from "../models/solicitud";

export function SolicitudesList({ filter }: { filter?: string }) {
  const [list, setList] = useState<Solicitud[]>([]);
  const { user } = useAuth();
  const [editing, setEditing] = useState<Solicitud | null>(null);
  const [histVer, setHistVer] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const data = await apiGet("/solicitudes/");
      setList(data);
    } catch (err) {
      console.error("Error al cargar solicitudes:", err);
      setList([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function mark(id: number, estado: string, observacion?: string) {
    try {
      await apiPut(`/solicitudes/${id}`, { estado, observacion_tecnico: observacion });
      await load();
    } catch (err) {
      console.error("Error al marcar:", err);
      alert("No fue posible actualizar el estado.");
    }
  }

  function canEdit(s: Solicitud) {
    if (!user) return false;
    return user.role !== "tecnico" && s.numero_identificacion_funcionario === user.numero_identificacion;
  }

  const visible = list.filter((s) => {
    if (!user) return false;
    if (user.role === "tecnico") {
      if (filter === "pendiente") return s.estado.toLowerCase() === "pendiente";
      return true;
    }
    return s.numero_identificacion_funcionario === user.numero_identificacion;
  });

  function fmt(d: string) {
    try {
      return new Date(d).toLocaleString();
    } catch {
      return d;
    }
  }

  function estadoBadge(estado: string) {
    const lower = estado?.toLowerCase();
    if (lower.includes("resuelto"))
      return "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300";
    if (lower.includes("pend"))
      return "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300";
    if (lower.includes("progreso"))
      return "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300";
    if (lower.includes("rechaz"))
      return "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300";
    return "bg-gray-100 text-gray-700 dark:bg-gray-800/80 dark:text-gray-400";
  }

  function cardColorClasses(estado: string) {
    const lower = estado.toLowerCase();
    if (lower.includes("resuelto"))
      return "border-green-300/40 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/10";
    if (lower.includes("pend"))
      return "border-yellow-300/40 bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/10";
    if (lower.includes("progreso"))
      return "border-blue-300/40 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/10";
    if (lower.includes("rechaz"))
      return "border-red-300/40 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/10";
    return "border-gray-300/30 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700/60";
  }

  function dotColor(estado: string) {
    const lower = estado.toLowerCase();
    if (lower.includes("resuelto")) return "bg-green-500 border-green-700";
    if (lower.includes("pend")) return "bg-yellow-500 border-yellow-700";
    if (lower.includes("progreso")) return "bg-blue-500 border-blue-700";
    if (lower.includes("rechaz")) return "bg-red-500 border-red-700";
    return "bg-gray-500 border-gray-700";
  }

  return (
    <div>
      {loading ? (
        <div className="text-center py-8 animate-pulse text-gray-600 dark:text-gray-300">
          Cargando solicitudes...
        </div>
      ) : visible.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400 py-8">
          No hay solicitudes para mostrar.
        </div>
      ) : (
        <div className="relative border-l border-gray-300 dark:border-gray-700 ml-4">
          {visible.map((s, i) => (
            <motion.div
              key={s.codigo_solicitud}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="relative pl-10 pb-8 group"
            >
              <span
                className={`absolute left-0 top-2 w-3 h-3 rounded-full border-2 transition-all ${dotColor(
                  s.estado
                )} group-hover:scale-125`}
              ></span>

              <div
                className={`rounded-2xl p-5 shadow-md border transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${cardColorClasses(
                  s.estado
                )}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="w-4 h-4" />
                    {fmt(s.fecha_solicitud)}
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${estadoBadge(s.estado)}`}>
                    {s.estado}
                  </span>
                </div>

                <h3 className="text-gray-900 dark:text-gray-100 font-semibold text-lg mb-1">
                  {s.descripcion_solicitud}
                </h3>

                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 mb-2">
                  <MessageSquare className="w-4 h-4" />
                  <span>{s.tipo_solicitud}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-sm text-gray-700 dark:text-gray-300 mb-2">
                  <p className="flex items-center gap-2">
                    <User className="w-4 h-4" /> {s.nombre_funcionario}
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> {s.dependencia || "Sin dependencia"}
                  </p>
                  <p className="flex items-center gap-2">
                    <Wrench className="w-4 h-4" />{" "}
                    {s.nombres_tecnico
                      ? `${s.nombres_tecnico} ${s.apellidos_tecnico}`
                      : "Técnico no asignado"}
                  </p>
                  {s.correo_tecnico && (
                    <p className="flex items-center gap-2">
                      <Mail className="w-4 h-4" /> {s.correo_tecnico}
                    </p>
                  )}
                  {s.telefono_tecnico && (
                    <p className="flex items-center gap-2">
                      <Phone className="w-4 h-4" /> {s.telefono_tecnico}
                    </p>
                  )}
                </div>

                {s.observacion_tecnico && (
                  <div className="text-sm italic text-gray-500 dark:text-gray-400 mb-3 border-l-4 border-gray-400 dark:border-gray-700 pl-3">
                    “{s.observacion_tecnico}”
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-2 mt-3">
                  {user?.role === "tecnico" ? (
                    <>
                      <button
                        onClick={() => mark(s.codigo_solicitud, "En Progreso")}
                        className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm transition"
                      >
                        En progreso
                      </button>
                      <button
                        onClick={() => mark(s.codigo_solicitud, "Resuelto")}
                        className="px-3 py-1 rounded-lg bg-green-700 hover:bg-green-800 text-white text-sm transition"
                      >
                        Resuelto
                      </button>
                      <button
                        onClick={() => mark(s.codigo_solicitud, "Rechazada")}
                        className="px-3 py-1 rounded-lg bg-red-700 hover:bg-red-800 text-white text-sm transition"
                      >
                        Rechazada
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setHistVer(s.codigo_solicitud)}
                        className="px-3 py-1 rounded-lg border border-gray-400 dark:border-gray-600 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-100 transition"
                      >
                        Ver historial
                      </button>

                      {canEdit(s) && (
                        <button
                          onClick={() => setEditing(s)}
                          className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm transition"
                        >
                          Editar
                        </button>
                      )}
                    </>
                  )}

                  <div className="ml-auto text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
                    <User className="w-3 h-3" /> #{s.codigo_solicitud}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal Edición */}
      {editing && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 dark:bg-black/60" onClick={() => setEditing(null)} />
          <div className="relative w-full max-w-2xl">
            <SolicitudForm
              initial={{
                codigo_solicitud: editing.codigo_solicitud,
                descripcion_solicitud: editing.descripcion_solicitud,
                codigo_tipo_solicitud: 1,
              }}
              onCancel={() => setEditing(null)}
              onSaved={() => {
                setEditing(null);
                load();
              }}
            />
          </div>
        </div>
      )}

      {histVer !== null && <HistorialModal codigo={histVer} onClose={() => setHistVer(null)} />}
    </div>
  );
}
