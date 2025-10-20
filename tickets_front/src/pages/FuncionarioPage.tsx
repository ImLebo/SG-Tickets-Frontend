// src/pages/FuncionarioPage.tsx
import { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { NewSolicitudForm } from "../components/NewSolicitudForm";
import { SolicitudesList } from "../components/SolicitudesList";

export function FuncionarioPage() {
  const [collapsed, setCollapsed] = useState(false);
  const [view, setView] = useState<"listar" | "crear">("listar");
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col">
        <main className="p-6 overflow-y-auto flex-1">
          {view === "listar" && <SolicitudesList />}
        </main>
      </div>

      {/* Modal para crear solicitud */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 shadow-lg w-full max-w-lg relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              ✖
            </button>
            <h2 className="text-lg font-semibold mb-4 text-primary">
              Crear nueva solicitud
            </h2>
            <NewSolicitudForm onCreated={() => setShowModal(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
