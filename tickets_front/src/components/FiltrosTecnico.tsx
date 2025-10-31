import { useState, useEffect } from "react";
import { apiGet } from "../services/api";

export function FiltrosTecnico({ onFilter }: { onFilter: (filters: any) => void }) {
  const [tipos, setTipos] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    estado: "",
    tipo: "",
    codigo: "",
    fechaInicio: "",
    fechaFin: "",
    busqueda: "",
  });

  useEffect(() => {
    apiGet("/catalogos/tipos-solicitud").then(setTipos).catch(console.error);
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    const updated = { ...filters, [name]: value };
    setFilters(updated);
    onFilter(updated);
  }

  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-gray-800 shadow-lg border border-gray-100 dark:border-gray-700 grid md:grid-cols-3 lg:grid-cols-5 gap-4">
      <input
        type="text"
        name="codigo"
        placeholder="Código"
        value={filters.codigo}
        onChange={handleChange}
        className="p-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
      />
      <select
        name="tipo"
        value={filters.tipo}
        onChange={handleChange}
        className="p-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
      >
        <option value="">Tipo de solicitud</option>
        {tipos.map((t) => (
          <option key={t.codigo_tipo_solicitud} value={t.codigo_tipo_solicitud}>
            {t.nombre_tipo_solicitud}
          </option>
        ))}
      </select>
      <select
        name="estado"
        value={filters.estado}
        onChange={handleChange}
        className="p-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
      >
        <option value="">Estado</option>
        <option value="Pendiente">Pendiente</option>
        <option value="En Progreso">En Progreso</option>
        <option value="Resuelto">Resuelto</option>
      </select>
      <input
        type="date"
        name="fechaInicio"
        value={filters.fechaInicio}
        onChange={handleChange}
        className="p-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
      />
      <input
        type="date"
        name="fechaFin"
        value={filters.fechaFin}
        onChange={handleChange}
        className="p-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
      />
      <input
        type="text"
        name="busqueda"
        placeholder="Buscar descripción..."
        value={filters.busqueda}
        onChange={handleChange}
        className="col-span-full p-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
      />
    </div>
  );
}
