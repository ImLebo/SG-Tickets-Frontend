// frontend/tickets_front/src/components/Sidebar.tsx
import { useAuth } from "../context/AuthContext";
import {
  ChevronLeft,
  ChevronRight,
  UserCircle,
  BadgeInfo,
  Phone,
  User,
  IdCard,
  Building2,
} from "lucide-react";

export function Sidebar({
  collapsed,
  onToggle,
  darkMode,
}: {
  collapsed: boolean;
  onToggle: () => void;
  darkMode: boolean;
}) {
  const { user } = useAuth();

  return (
    <aside
      className={`transition-all duration-300 flex flex-col justify-between shadow-xl
        ${collapsed ? "w-20" : "w-64"}
        ${collapsed
          ? darkMode
            ? "bg-gradient-to-b from-gray-800 to-gray-900"
            : "bg-gradient-to-b from-blue-600 to-indigo-700"
          : darkMode
          ? "bg-gray-900 border-r border-gray-800"
          : "bg-white border-r border-gray-200"
        }
        relative z-20
      `}
    >
      {/* Header */}
      <div
        className={`flex items-center justify-between p-4 border-b transition-colors
          ${
            collapsed
              ? "border-transparent"
              : darkMode
              ? "bg-gradient-to-r from-gray-800 to-gray-900 border-gray-800"
              : "bg-gradient-to-r from-blue-600 to-indigo-700 border-blue-500/40"
          }
        `}
      >
        <div className="flex items-center gap-2">
          <UserCircle
            className={`w-7 h-7 ${
              collapsed
                ? "text-white"
                : darkMode
                ? "text-blue-400"
                : "text-white"
            }`}
          />
          {!collapsed && (
            <h2
              className={`text-lg font-semibold tracking-wide ${
                darkMode ? "text-white" : "text-white"
              }`}
            >
              Mi Perfil
            </h2>
          )}
        </div>

        <button
          onClick={onToggle}
          className={`p-1 rounded hover:bg-white/10 transition ${
            collapsed
              ? "text-white hover:text-yellow-300"
              : "text-white hover:text-yellow-300"
          }`}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Perfil Detallado */}
      {!collapsed && (
        <div
          className={`flex-1 overflow-y-auto space-y-3 p-4 transition-colors
            ${darkMode ? "text-gray-300" : "text-gray-700"}
          `}
        >
          <div
            className={`rounded-xl p-3 ${
              darkMode ? "bg-gray-800/60" : "bg-gray-50"
            } shadow-sm border ${
              darkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <User className="w-4 h-4 text-indigo-400" />
              <h3
                className={`text-sm font-semibold ${
                  darkMode ? "text-white" : "text-indigo-700"
                }`}
              >
                Información Personal
              </h3>
            </div>

            <div className="space-y-1 text-sm">
              <p>
                <span className="font-medium">Nombre:</span>{" "}
                {user?.nombre ?? "Sin nombre"}
              </p>
              <p>
                <span className="font-medium">Apellidos:</span>{" "}
                {user?.apellidos ?? "Sin apellidos"}
              </p>
              <p>
                <span className="font-medium">Sexo:</span>{" "}
                {user?.sexo ?? "-"}
              </p>
            </div>
          </div>

          <div
            className={`rounded-xl p-3 ${
              darkMode ? "bg-gray-800/60" : "bg-gray-50"
            } shadow-sm border ${
              darkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <IdCard className="w-4 h-4 text-indigo-400" />
              <h3
                className={`text-sm font-semibold ${
                  darkMode ? "text-white" : "text-indigo-700"
                }`}
              >
                Identificación
              </h3>
            </div>

            <p className="text-sm">
              <span className="font-medium">Cédula:</span>{" "}
              {user?.numero_identificacion ?? "-"}
            </p>
            <p className="text-sm">
              <span className="font-medium">Rol:</span>{" "}
              {user?.role ?? "-"}
            </p>
          </div>

          <div
            className={`rounded-xl p-3 ${
              darkMode ? "bg-gray-800/60" : "bg-gray-50"
            } shadow-sm border ${
              darkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <Phone className="w-4 h-4 text-indigo-400" />
              <h3
                className={`text-sm font-semibold ${
                  darkMode ? "text-white" : "text-indigo-700"
                }`}
              >
                Contacto
              </h3>
            </div>

            <p className="text-sm">
              <span className="font-medium">Teléfono:</span>{" "}
              {user?.telefono ?? "-"}
            </p>
            <p className="text-sm">
              <span className="font-medium">Dependencia:</span>{" "}
              {user?.codigo_dependencia ?? "-"}
            </p>
          </div>
        </div>
      )}

      {/* Footer */}
      {!collapsed && (
        <div
          className={`text-xs text-center py-3 border-t transition-colors
            ${darkMode ? "border-gray-800 text-gray-500" : "border-gray-200 text-gray-400"}
          `}
        >
          SG Tickets © 2025
        </div>
      )}
    </aside>
  );
}
