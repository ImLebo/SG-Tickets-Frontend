export interface Solicitud {
  codigo_solicitud: number;
  descripcion_solicitud: string;
  tipo_solicitud: string;
  numero_identificacion_funcionario: number;
  nombre_funcionario: string;
  dependencia: string;
  fecha_solicitud: string;
  estado: string;
  observacion_tecnico: string | null;
  numero_identificacion_tecnico: number | null;
  nombres_tecnico: string | null;
  apellidos_tecnico: string | null;
  correo_tecnico: string | null;
  telefono_tecnico: string | null;
}
