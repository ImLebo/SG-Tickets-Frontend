import { LogOut, List, PlusCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface Props {
  title: string;
  onChangeView: (view: "crear" | "listar") => void;
  onToggleDark: () => void;
  darkMode: boolean;
}

export function Navbar({ title, onChangeView, onToggleDark, darkMode }: Props) {
  const { logout, user } = useAuth();

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      {/* Título */}
      <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
        {title}
      </h1>

      <div className="flex items-center gap-3">
        {/* Botones visibles solo para FUNCIONARIO */}
        {user?.role === "funcionario" && (
          <>
            <button
              onClick={() => onChangeView("crear")}
              className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              <PlusCircle size={18} />
              Crear solicitud
            </button>

            <button
              onClick={() => onChangeView("listar")}
              className="flex items-center gap-2 px-3 py-1.5 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition"
            >
              <List size={18} />
              Listar solicitudes
            </button>
          </>
        )}

        {/* Cambiar modo oscuro */}
        <button
          onClick={onToggleDark}
          className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          {darkMode ? "Claro" : "Oscuro"}
        </button>

        {/* Cerrar sesión */}
        <button
          onClick={logout}
          className="flex items-center gap-2 px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          <LogOut size={18} />
          Cerrar sesión
        </button>
      </div>
    </header>
  );
}
