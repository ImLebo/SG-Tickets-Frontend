import { getTecnicos, createTecnico } from "../services/tecnicoServices";
import type { Tecnico} from "../services/tecnicoServices.tsx";

export const fetchTecnicos = async (): Promise<Tecnico[]> => {
  try {
    return await getTecnicos();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const addTecnico = async (tecnico: Tecnico): Promise<boolean> => {
  try {
    await createTecnico(tecnico);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
