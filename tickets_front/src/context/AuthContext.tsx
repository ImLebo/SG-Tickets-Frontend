import React, { createContext, useContext, useState } from "react";
import { apiPost } from "../services/api";

export type Role = "tecnico" | "funcionario" | null;

export type User = {
  correo: string;
  numero_identificacion: number;
  nombre?: string;
  role: Role;
};

interface AuthContextType {
  user: User | null;
  login: (correo: string, numero_identificacion: number) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  async function login(correo: string, numero_identificacion: number) {
    const data = await apiPost("/auth/login", { correo, numero_identificacion });
    setUser(data);
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
