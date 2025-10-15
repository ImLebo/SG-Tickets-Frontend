import { useState } from "react";
import type { Tecnico } from "../services/tecnicoServices.tsx";
import { addTecnico } from "../controller/tecnicoController.tsx";

interface Props {
  onSuccess: () => void;
}

const TecnicoForm: React.FC<Props> = ({ onSuccess }) => {
  const [form, setForm] = useState<Tecnico>({
    nombres_tecnico: "",
    apellidos_tecnico: "",
    correo_tecnico: "",
    telefono_tecnico: "",
    numero_identificacion_tecnico: 0,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const success = await addTecnico(form);
    setLoading(false);
    if (success) {
      setForm({
        nombres_tecnico: "",
        apellidos_tecnico: "",
        correo_tecnico: "",
        telefono_tecnico: "",
        numero_identificacion_tecnico: 0,
      });
      onSuccess();
    } else {
      alert("Error al crear técnico");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4 animate-fadeIn">
      <h2 className="text-xl font-bold mb-4">Crear Técnico</h2>
      <input
        type="text"
        name="nombres_tecnico"
        placeholder="Nombres"
        value={form.nombres_tecnico}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        name="apellidos_tecnico"
        placeholder="Apellidos"
        value={form.apellidos_tecnico}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="email"
        name="correo_tecnico"
        placeholder="Correo"
        value={form.correo_tecnico}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="tel"
        name="telefono_tecnico"
        placeholder="Teléfono"
        value={form.telefono_tecnico}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="number"
        name="numero_identificacion_tecnico"
        placeholder="Número de identificación"
        value={form.numero_identificacion_tecnico || ""}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
      >
        {loading ? "Creando..." : "Crear"}
      </button>
    </form>
  );
};

export default TecnicoForm;
