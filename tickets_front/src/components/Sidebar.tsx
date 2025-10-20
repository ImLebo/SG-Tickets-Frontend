// src/components/Sidebar.tsx
import { useAuth } from "../context/AuthContext";

export function Sidebar({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle: () => void;
}) {
  const { user } = useAuth();

  return (
    <aside
      className={`bg-white border-r border-gray-200 p-4 h-screen transition-all duration-300 flex flex-col justify-between ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Título y toggle */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-primary">
          {collapsed ? "👤" : "Mi perfil"}
        </h2>
        <button
          onClick={onToggle}
          className="text-gray-400 hover:text-primary text-sm"
        >
          {collapsed ? ">" : "<"}
        </button>
      </div>

      {/* Información del usuario */}
      {!collapsed && (
        <div className="text-sm space-y-2 text-gray-600 overflow-y-auto flex-1">
          <p>
            <span className="font-medium text-gray-800">Nombre: </span>
            {user?.nombre ?? "Sin nombre"}
          </p>
          <p>
            <span className="font-medium text-gray-800">Apellidos: </span>
            {user?.apellidos ?? "Sin apellidos"}
          </p>
          <p>
            <span className="font-medium text-gray-800">Cédula: </span>
            {user?.numero_identificacion ?? "-"}
          </p>
          <p>
            <span className="font-medium text-gray-800">Rol: </span>
            {user?.role ?? "-"}
          </p>
          <p>
            <span className="font-medium text-gray-800">Sexo: </span>
            {user?.sexo ?? "-"}
          </p>
          <p>
            <span className="font-medium text-gray-800">Teléfono: </span>
            {user?.telefono ?? "-"}
          </p>
          <p>
            <span className="font-medium text-gray-800">Dependencia: </span>
            {user?.codigo_dependencia ?? "-"}
          </p>
        </div>
      )}

      {/* Pie con versión o logo */}
      {!collapsed && (
        <div className="text-xs text-gray-400 text-center mt-4">
          SG Tickets © 2025
        </div>
      )}
    </aside>
  );
}
