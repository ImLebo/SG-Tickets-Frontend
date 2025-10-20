import React, { createContext, useContext, useState } from "react";
import { apiPost, apiGet } from "../services/api";
import { jwtDecode } from "jwt-decode";

type Role = "tecnico" | "funcionario" | null;

interface User {
  correo: string;
  numero_identificacion: number;
  nombre: string;
  apellidos?: string;
  telefono?: string;
  sexo?: string;
  codigo_dependencia?: number;
  role: Role;
  token: string;
}

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

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  async function login(correo: string, numero_identificacion: number) {
    // 🟢 1. Login: obtiene token
    const data = await apiPost("/auth/login", { correo, numero_identificacion });
    const token = data.access_token;
    localStorage.setItem("token", token);

    // 🟢 2. Decodificar token
    const decoded: any = jwtDecode(token);

    // 🟢 3. Obtener datos del funcionario o técnico según rol
    let userData = null;
    if (decoded.tipo_usuario === "funcionario") {
      userData = await apiGet(`/funcionarios/${decoded.numero_identificacion}`, token);
    } else {
      userData = await apiGet(`/tecnicos/${decoded.numero_identificacion}`, token);
    }

    // 🟢 4. Guardar usuario
    setUser({
      correo: userData.correo_funcionario || userData.correo_tecnico || correo,
      numero_identificacion: decoded.numero_identificacion,
      nombre: userData.nombres_funcionario || userData.nombres_tecnico || decoded.nombre,
      apellidos: userData.apellidos_funcionario || userData.apellidos_tecnico || "",
      telefono: userData.telefono_funcionario || userData.telefono_tecnico || "",
      sexo: userData.sexo || "",
      codigo_dependencia: userData.codigo_dependencia,
      role: decoded.tipo_usuario,
      token,
    });
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("token");
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
