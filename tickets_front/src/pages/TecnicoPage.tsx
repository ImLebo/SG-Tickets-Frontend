import { useState } from "react";
import { DashboardLayout } from "../layout/DashboardLayout";
import { TecnicoList } from "../components/tecnicoList";
import { motion } from "framer-motion";

export function TecnicoPage() {
  const [tab, setTab] = useState<"solicitudes" | "revisiones">("solicitudes");
  const [showFilters, setShowFilters] = useState(false);

  return (
    <DashboardLayout>
      <div className="flex flex-wrap justify-between items-center mb-6 gap-2">
        <div className="flex gap-3">
          {[
            { key: "solicitudes", label: "Solicitudes" },
            { key: "revisiones", label: "Mis Revisiones" },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key as any)}
              className={`px-5 py-2 rounded-lg font-medium transition-all ${
                tab === t.key
                  ? "bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-md"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setShowFilters((v) => !v)}
            className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-lg shadow hover:shadow-md transition-all whitespace-nowrap"
          >
            {showFilters ? "Ocultar filtros" : "Mostrar filtros"}
          </button>
        </div>
      </div>

      <motion.div
        key={tab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <TecnicoList mode={tab} showFilters={showFilters} />
      </motion.div>
    </DashboardLayout>
  );
}
