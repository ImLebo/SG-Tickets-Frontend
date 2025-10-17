import { useAuth } from "../context/AuthContext";

export function Sidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  const { user } = useAuth();
  return (
    <aside className={`bg-white p-4 shadow-sm h-full transition-all ${collapsed ? "w-20" : "w-64"}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="text-primary font-bold">{collapsed ? "SG" : "SG Tickets"}</div>
        <button onClick={onToggle} className="text-sm text-gray3">
          {collapsed ? ">" : "<"}
        </button>
      </div>
      <div className="mb-6 text-sm">
        <div>{user?.nombre ?? "Sin nombre"}</div>
        <div className="text-gray4 text-xs">Cédula: {user?.numero_identificacion ?? "-"}</div>
        <div className="text-gray4 text-xs">Rol: {user?.role ?? "-"}</div>
      </div>
      <nav>
        <a className="block py-2 text-sm text-gray2">Dashboard</a>
        <a className="block py-2 text-sm text-gray2">Solicitudes</a>
      </nav>
    </aside>
  );
}
