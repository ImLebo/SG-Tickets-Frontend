import { SolicitudesList } from "../components/SolicitudesList";

export function TecnicoPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Solicitudes pendientes</h2>
      <SolicitudesList filter="pendiente" />
    </div>
  );
}
