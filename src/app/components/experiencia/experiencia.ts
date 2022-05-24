import { Persona } from "../persona/persona";

export interface ExpLaboral {
    id: number;
    posicion: string;
    nombreEmpresa: string;
    fechaInicio: string;
    fechaFin: string;
    descripcion: string;
    persona: Persona,
}