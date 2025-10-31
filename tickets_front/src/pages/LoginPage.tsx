//pages/LoginPage.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function LoginPage() {
  const { login } = useAuth();
  const [correo, setCorreo] = useState("");
  const [numero, setNumero] = useState<number>(0);
  const [err, setErr] = useState<string | null>(null);
  const nav = useNavigate();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    try {
      await login(correo, numero);
      nav("/dashboard");
    } catch (e: any) {
      setErr(e.message || "Error al iniciar sesión");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary to-secondary text-white p-6">
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="max-w-md w-full bg-white/5 backdrop-blur-md rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-4 text-white">Inicia sesión</h2>
        <form onSubmit={onSubmit} className="flex flex-col gap-3">
          <input required value={correo} onChange={(e) => setCorreo(e.target.value)} placeholder="Correo" className="p-3 rounded-md bg-white/10 placeholder:text-gray5" />
          <input required value={numero} onChange={(e) => setNumero(Number(e.target.value))} placeholder="Número de identificación" className="p-3 rounded-md bg-white/10 placeholder:text-gray5" />
          {err && <div className="text-red-400">{err}</div>}
          <button className="mt-3 py-2 rounded-md bg-state2 text-white font-semibold">Entrar</button>
        </form>
      </motion.div>
    </div>
  );
}
