import { Persona } from "../persona/persona";

export interface Experiencia {
    id: number;
    posicion: string;
    nombreEmpresa: string;
    fechaInicio: string;
    fechaFin: string;
    descripcion: string;
    persona: Persona,
}