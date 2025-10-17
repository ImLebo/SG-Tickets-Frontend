import { useAuth } from "../context/AuthContext";

export function Header({ title }: { title: string }) {
  const { user, logout } = useAuth();

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
      <h1 className="text-xl font-semibold text-primary">{title}</h1>
      <div className="flex items-center gap-4">
        {user && <div className="text-sm text-gray2">{user.nombre ?? user.correo}</div>}
        <button onClick={logout} className="px-3 py-1 border rounded-md text-gray2">
          Cerrar sesión
        </button>
      </div>
    </header>
  );
}
