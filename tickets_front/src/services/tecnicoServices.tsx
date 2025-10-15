const API_URL = "api/tecnicos/";

export interface Tecnico {
  nombres_tecnico: string;
  apellidos_tecnico: string;
  correo_tecnico: string;
  telefono_tecnico: string;
  numero_identificacion_tecnico: number;
}

export const getTecnicos = async (): Promise<Tecnico[]> => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al obtener técnicos");
  return res.json();
};

export const createTecnico = async (tecnico: Tecnico) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tecnico),
  });
  if (!res.ok) throw new Error("Error al crear técnico");
  return res.json();
};
