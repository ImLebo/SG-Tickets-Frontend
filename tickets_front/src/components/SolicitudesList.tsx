import { useEffect, useState } from "react";
import { apiGet, apiPut } from "../services/api";
import { useAuth } from "../context/AuthContext";

export function SolicitudesList({ filter }: { filter?: string }) {
  const [list, setList] = useState<any[]>([]);
  const { user } = useAuth();

  async function load() {
    const data = await apiGet("/solicitudes/");
    setList(data);
  }

  useEffect(() => {
    load();
  }, []);

  async function mark(id: number, estado: string, observacion?: string) {
    await apiPut(`/solicitudes/${id}`, { estado, observacion_tecnico: observacion });
    load();
  }

  const visible = list.filter((s) => {
    if (!user) return false;
    if (user.role === "tecnico") {
      if (filter === "pendiente") return s.estado.toLowerCase() === "pendiente";
      return true;
    }
    return s.numero_identificacion_funcionario === user.numero_identificacion;
  });

  return (
    <div className="space-y-3">
      {visible.map((s) => (
        <div key={s.codigo_solicitud} className="bg-white p-4 rounded shadow flex justify-between">
          <div>
            <div className="text-sm text-gray3">
              #{s.codigo_solicitud} — {new Date(s.fecha_solicitud).toLocaleString()}
            </div>
            <div className="font-semibold">{s.descripcion_solicitud}</div>
            <div className="text-xs text-gray4">Estado: {s.estado}</div>
          </div>
          {user?.role === "tecnico" && (
            <div className="flex flex-col gap-2">
              <button onClick={() => mark(s.codigo_solicitud, "En Progreso")} className="px-3 py-1 bg-state2 text-white rounded">
                En Progreso
              </button>
              <button onClick={() => mark(s.codigo_solicitud, "Resuelto")} className="px-3 py-1 bg-primary text-white rounded">
                Marcar Resuelto
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
