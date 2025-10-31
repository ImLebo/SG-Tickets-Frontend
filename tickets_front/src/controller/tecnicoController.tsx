import { getTecnicos, createTecnico } from "../services/tecnicoServices";
import type { Tecnico } from "../models/tecnico";

export async function fetchTecnicos(): Promise<Tecnico[]> {
  try {
    return await getTecnicos();
  } catch (error) {
    console.error("❌ Error al obtener técnicos:", error);
    return [];
  }
}

export async function addTecnico(tecnico: Tecnico): Promise<boolean> {
  try {
    await createTecnico(tecnico);
    return true;
  } catch (error) {
    console.error("❌ Error al crear técnico:", error);
    return false;
  }
}
