import { NewSolicitudForm } from "../components/NewSolicitudForm";
import { SolicitudesList } from "../components/SolicitudesList";

export function FuncionarioPage({
  view,
  onChangeView,
}: {
  view: "listar" | "crear";
  onChangeView: (view: "listar" | "crear") => void;
}) {
  return (
    <>
      {view === "listar" ? (
        <SolicitudesList />
      ) : (
        <div className="max-w-2xl mx-auto mt-6">
          <h2 className="text-lg font-semibold mb-4 text-primary">
            Crear nueva solicitud
          </h2>
          <NewSolicitudForm onCreated={() => onChangeView("listar")} />
        </div>
      )}
    </>
  );
}
