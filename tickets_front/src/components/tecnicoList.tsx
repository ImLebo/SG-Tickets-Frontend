import { useEffect, useState } from "react";
import type { Tecnico } from "../services/tecnicoServices.tsx";
import { fetchTecnicos } from "../controller/tecnicoController";

const TecnicoList: React.FC = () => {
  const [tecnicos, setTecnicos] = useState<Tecnico[]>([]);
  const [loading, setLoading] = useState(true);

  const loadTecnicos = async () => {
    setLoading(true);
    const data = await fetchTecnicos();
    setTecnicos(data);
    setLoading(false);
  };

  useEffect(() => {
    loadTecnicos();
  }, []);

  if (loading) return <p className="text-center animate-pulse">Cargando técnicos...</p>;

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">Lista de Técnicos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tecnicos.map((t) => (
          <div key={t.numero_identificacion_tecnico} className="p-4 border rounded shadow hover:shadow-lg transition animate-fadeIn">
            <p><span className="font-bold">ID:</span> {t.numero_identificacion_tecnico}</p>
            <p><span className="font-bold">Nombre:</span> {t.nombres_tecnico} {t.apellidos_tecnico}</p>
            <p><span className="font-bold">Correo:</span> {t.correo_tecnico}</p>
            <p><span className="font-bold">Teléfono:</span> {t.telefono_tecnico}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TecnicoList;
