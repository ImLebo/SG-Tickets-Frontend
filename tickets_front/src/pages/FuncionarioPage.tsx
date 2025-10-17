import { useState } from "react";
import { NewSolicitudForm } from "../components/NewSolicitudForm";
import { SolicitudesList } from "../components/SolicitudesList";

export function FuncionarioPage() {
  const [created, setCreated] = useState<number | null>(null);
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Mis solicitudes</h2>
      <NewSolicitudForm onCreated={(s) => setCreated(s.codigo_solicitud)} />
      <SolicitudesList />
    </div>
  );
}
